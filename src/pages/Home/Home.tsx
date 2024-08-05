import { useEffect } from "react";
import { Header } from "@components/Header";
import { Link  } from "react-router-dom";
import { authService } from "@services/authService";
import Avvvatars from "avvvatars-react";
import "./Home.css"
import { useAppSelector } from "@hooks/store";
import { UserActions } from "@hooks/user/UserActions";

function Home() {
    const user = useAppSelector((state) => state.user);
    const { handleSetUser } = UserActions()

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        try {
          const {isValid, user} = await authService.validateToken();
          if(isValid) {
            handleSetUser(user);
          }
        } catch (error) {
          console.error("Failed to fetch user", error);
        }
      }
    };

    fetchUser();
  }, [handleSetUser, user]);

  const addApplication = () => {
    console.log("add application");
  };

  return (
    <>
        <Header />
        <div className='pr-6 pl-6 pt-6 h-full flex flex-col items-center'>
            <div className="profile">
                <div className="avatar [grid-area:avatar]" >
                    <Avvvatars value={user?.name} size={85} border={true} borderColor="#CCA349" borderSize={3}/>
                </div>
                <div className="edit [grid-area:edit] flex items-center">
                    <Link to="/profile">
                        Edit Profile
                    </Link>
                </div>
            </div>
            <h1 className="text-base font-medium">
                {user?.name || "Loading..."}
            </h1>
        </div>
        <div className='pr-6 pl-6 pt-7 h-full flex flex-col items-center'>
            <div className="grid grid-cols-2 gap-4 pb-8 w-full">
                <div className="app-box h-24 bg-[#f6e8d2]">
                    <h3>
                        Saved Applications
                    </h3>
                    <h2>
                        {user.applications?.length || 0}
                    </h2>
                </div>
                <div className="app-box h-24 bg-[#f6e8d2]">
                    <h3>
                        Applied
                    </h3>
                    <h2>
                        {user?.applications?.filter(app => app.statusId === 2).length || 0}
                    </h2>
                </div>
                <div className="app-box h-28 border border-solid border-black">
                    <h3>
                        Interviews
                    </h3>
                    <h2>
                        {user?.applications?.filter(app => app.statusId === 3).length || 0}
                    </h2>
                </div>
                <div className="app-box h-28 border border-solid border-black">
                    <h3>
                        Offers
                    </h3>
                    <h2>
                        {user?.applications?.filter(app => app.statusId === 4).length || 0}
                    </h2>
                </div>
            </div>
            <button className="h-9 leading-7 text-sm flex items-center justify-center" onClick={addApplication}>
                Add application
            </button>
        </div>
        
    </>
  );
}

export default Home;
