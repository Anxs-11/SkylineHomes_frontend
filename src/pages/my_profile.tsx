import { useGetIdentity, useOne } from "@refinedev/core";

import { Profile } from "components";

const MyProfile = () => {
    const { data: user } = useGetIdentity();
    const { data, isLoading, isError } = useOne({
        // @ts-ignore
        resource: "users",id: user?.userid,
    });

    const myProfile = data?.data ?? [];
    
    if (isLoading) return <div>loading...</div>;
    if (isError) return <div>error...</div>;
     
     
    return (
        <Profile
            // @ts-ignore
            type="My" name={myProfile.name} email={myProfile.email} avatar={myProfile.avatar} properties={myProfile.allProperties}
        />
    );
};

export default MyProfile;