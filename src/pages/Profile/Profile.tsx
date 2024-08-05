import { useNavigate } from "react-router-dom";
import { Header } from "@components/Header";
import "./Profile.css";
import Avvvatars from "avvvatars-react";
import { useAppSelector } from "@hooks/store";
import { useState, useEffect, useMemo } from "react";
import { UserActions } from "@hooks/user/UserActions";
import { editProfile } from "@services/profileService";
import { getSkills, removeSkill, saveSkill } from "@services/skillService";
import { authService } from "@services/authService";

interface Skill{
    id: number;
    name: string;
}

function Profile() {
    const user = useAppSelector((state) => state.user);
    const navigate = useNavigate();
    const { handleSetUser } = UserActions()

    const [isEditing, setIsEditing] = useState(false);
    const [profession, setProfession] = useState(user?.profile.profession || "");
    const [bio, setBio] = useState(user?.profile.bio || "");
    const [userSkills, setUserSkills] = useState(
        user?.skills.map(skill => ({
            id: skill.Skill.id,
            name: skill.Skill.name
        })) || []
    );
    
    const [skills, setSkills] = useState<Skill[]>([]);
    const [newSkill, setNewSkill] = useState<string>("");

    const [initialProfile] = useState(user?.profile);
    const [initialSkills] = useState(user?.skills.map(skill => ({
        id: skill.Skill.id,
        name: skill.Skill.name
    })) || []);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const skillsData = await getSkills();
                setSkills(skillsData);
            } catch (error) {
                console.error("Failed to fetch skills:", error);
            }
        };

        fetchSkills();
    }, []);

    const [leftSkills, rightSkills] = useMemo(() => {
        if (userSkills.length <= 9) return [userSkills, []];
        const half = Math.ceil(userSkills.length / 2);
        return [userSkills.slice(0, half), userSkills.slice(half)];
    }, [userSkills]);

    const goBack = () => {
        navigate(-1);
    };

    const handleSave = async () => {
        const profile = { ...user?.profile, profession, bio };
    
        // Filtrar las habilidades que deben ser agregadas
        const newSkills = userSkills.filter(skill => !user?.skills.some(existingSkill => existingSkill.Skill.id === skill.id));
        
        // Filtrar las habilidades que deben ser eliminadas
        const skillsToRemove = user?.skills.filter(existingSkill => !userSkills.some(skill => skill.id === existingSkill.Skill.id));
    
        // Crear las promesas para agregar habilidades
        const addSkillPromises = newSkills.map(skill => 
            saveSkill({ skillId: skill.id, userId: user?.id })
                .catch(error => {
                    if (error.message.includes('Unique constraint failed')) {
                        console.warn(`Skill ${skill.id} already exists for user ${user?.id}`);
                    } else {
                        throw error;
                    }
                })
        );
    
        // Crear las promesas para eliminar habilidades
        const removeSkillPromises = skillsToRemove.map(existingSkill => 
            removeSkill({ skillId: existingSkill.Skill.id, userId: user?.id })
                .catch(error => {
                    console.error(`Error removing skill ${existingSkill.Skill.id}:`, error);
                })
        );
    
        try {
            const response = await editProfile(profile);
            if (response && response.status === 200) {
                await Promise.all([...addSkillPromises, ...removeSkillPromises]);
    
                const { user } = await authService.validateToken();
                handleSetUser(user);
            } else {
                alert("An error occurred while updating your profile");
            }
        } catch (error) {
            console.error("An error occurred while saving data:", error);
            alert("An error occurred while saving data");
        }
    
        setIsEditing(false);
    };
    const handleAddSkill = async () => {
        if (newSkill && userSkills.length < 20 && !userSkills.some(skill => skill.name === newSkill)) {
            const selectedSkill = skills.find(skill => skill.name === newSkill);
            if (selectedSkill) {
                setUserSkills([...userSkills, { id: selectedSkill.id, name: selectedSkill.name }]);
            }
            setNewSkill("");
        }
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        setUserSkills(userSkills.filter(skill => skill.name !== skillToRemove));
    };

    const handleCancelEdit = () => {
        setProfession(initialProfile?.profession || "");
        setBio(initialProfile?.bio || "");
        setUserSkills(initialSkills || []);
        setNewSkill("");
        setIsEditing(false);
    };

    return (
        <>
            <Header />
            <section className="profile-container">
                <button onClick={goBack} className="back-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="back-arrow">
                        <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
                    </svg>
                </button>
                <div className="pl-10">
                    <div className="flex items-center justify-start gap-4">
                        <div className="flex-shrink-0">
                            <Avvvatars value={user?.name} size={85} border={true} borderColor="#CCA349" borderSize={3}/>
                        </div>
                        <div className="flex flex-col flex-grow text-start">
                            <h1>{user?.name}</h1>
                            {isEditing ? (
                                <>
                                    <input
                                        type="text"
                                        value={profession}
                                        onChange={(e) => setProfession(e.target.value)}
                                        placeholder="Enter your profession"
                                        className="mt-2"
                                    />
                                </>
                            ) : (
                                <>
                                    <p>{profession || "Please add your profession"}</p>
                                </>
                            )}
                        </div>
                        <div className="flex flex-col h-12 justify-between">
                            <button onClick={() => setIsEditing(!isEditing)} className="edit-button">
                                {isEditing ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="cancel-edit" onClick={handleCancelEdit}>
                                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="edit">
                                        <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>
                                    </svg>
                                )}
                            </button>
                            {isEditing && (
                                <button 
                                    onClick={handleSave}
                                    className="save-button"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="save">
                                        <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-242.7c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32L64 32zm0 96c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32L96 224c-17.7 0-32-14.3-32-32l0-64zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                </div>
            </section>
            <section className="about w-full h-full bg-white shadow-[inset_0_1px_1px_rgba(0,0,0,0.2)] shadow-slate-200 pl-10 pr-10 pt-5 text-start">
                <h1>
                    About
                </h1>
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Enter your About"
                            className="mt-2"
                        />
                    </>
                ) : (
                    <>
                        <p>{bio!=null && bio?.length > 100 ? bio.slice(0,100) + "..." : bio || "Please add your About"}</p>
                    </>
                )}
                <div className="flex items-center justify-start gap-4">
                    <h1>
                        Skills
                    </h1>
                    {isEditing && (
                        <button 
                            onClick={handleAddSkill}
                            className="add-button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="add">
                                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
                            </svg>
                        </button>
                    )}
                </div>
                {isEditing && (
                    <div>
                        <select className="bg-white" value={newSkill} onChange={(e) => setNewSkill(e.target.value)}>
                            <option value="">Select a skill</option>
                            {skills.map((skill, index) => (
                                <option key={index} value={skill.name}>{skill.name}</option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="skills-container grid grid-cols-2 justify-between w-full">
                    <>
                        <ul className="list-disc ml-5">
                            {leftSkills.map((skill, index) => (
                                <div className="flex items-center justify-start">
                                    <li key={index}>{skill.name}</li>
                                    {isEditing && (
                                        <button onClick={() => handleRemoveSkill(skill.name)}  className="remove-button">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="remove">
                                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                
                            ))}
                        </ul>
                        <ul className="list-disc ml-5">
                            {rightSkills.map((skill, index) => (
                                <div className="flex items-center justify-start">
                                    <li key={index}>{skill.name}</li>
                                    {isEditing && (
                                        <button onClick={() => handleRemoveSkill(skill.name)}  className="remove-button">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="remove">
                                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </ul>
                    </>
                    
                </div>
            </section>
            
        </>
    );
}

export default Profile;
