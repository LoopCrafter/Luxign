import { UserProfile } from "@clerk/nextjs";

const ProfilePage = () => {
  return (
    <div className="flex justify-center py-10">
      <UserProfile
        appearance={{
          elements: {
            card: "shadow-none border rounded-2xl",
            navbar: "profile-sidebar", // hide sidebar top
            pageScrollBox: "p-6",
          },
        }}
      />
    </div>
  );
};

export default ProfilePage;
