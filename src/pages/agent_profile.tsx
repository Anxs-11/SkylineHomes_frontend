import { useGetIdentity, useOne } from "@refinedev/core";
import { useParams } from "react-router-dom";
import { Profile } from "components";

const AgentProfile = () => {
    const {id}=useParams();
    const { data, isLoading, isError } = useOne({
        // @ts-ignore
        resource: "users",id: id as string,
    });

    const myProfile = data?.data ?? [];
    
    if (isLoading) return <div>loading...</div>;
    if (isError) return <div>error...</div>;
     
     
    return (
        <Profile
            // @ts-ignore
            type="Agent" name={myProfile.name} email={myProfile.email} avatar={myProfile.avatar} properties={myProfile.allProperties}
        />
    );
};

export default AgentProfile;