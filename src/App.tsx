// App.tsx

import { Routes, Route } from "react-router-dom";
import UserSignIn from "./components/auth/auth";
import { Button } from "./components/ui/button";
import { useGetCurrentUser } from "./components/students/query/student-query";
import UserLogOutButton from "./components/students/components/student-logout-button";

const Home = () => {
  const user = useGetCurrentUser();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome Home</h1>
      <Button variant="outline" size="lg">
        Go Somewhere
      </Button>
      <div>
        {user ? (
          <div>
            <h1>{user._id}</h1>
          </div>
        ) : (
          <div>
            <h1>loading user id</h1>
          </div>
        )}
      </div>
      <div>
        <UserLogOutButton />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <main className="flex flex-col h-full items-center justify-center bg-background text-foreground px-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<UserSignIn />} />
        {/* You can add more routes here */}
      </Routes>
    </main>
  );
};

export default App;
