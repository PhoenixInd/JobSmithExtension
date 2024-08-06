interface UserData {
    id: number
    name: string
    email: string
    roleId: number
    createdAt: Date
    updatedAt: Date
    profile: {
        id: number
        userId: number
        profession: string
        bio: string
        location: string
        website: string
    } 
    Role:{
        id: number
        name: string
    }
    skills: Array<{
        userId: number,
        skillId: number,
        Skill: {
          id: number,
          name: string,
          createdAt: Date,
          updatedAt: Date
        }
      }>   
}

export default UserData