import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "@/components/ui/form";
import SubmitButton from "../form-components/custom-form-submit-button";
import CustomPasswordInput from "../form-components/custom-form-password-input";
import { students } from "@/assets/students";
import CustomSelectSearch from "../form-components/custom-form-select-search";

const userAuthSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(8, "Min 8 characters").max(12, "Max 12 characters"),
});

type UserAuthType = z.infer<typeof userAuthSchema>;

const UserSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuthActions();

  const form = useForm<UserAuthType>({
    resolver: zodResolver(userAuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: UserAuthType) => {
    try {
      setLoading(true);
      setError(null);

      const matchedStudent = students.find(
        (student) => student.email === data.email
      );
      if (!matchedStudent) {
        setError("You are not authorized");
        return;
      }

      if (data.password !== matchedStudent.password) {
        setError("Incorrect offline password");
        return;
      }

      await signIn("password", {
        email: data.email,
        password: data.password,
        flow: "signUp",
      });

      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.message?.includes("InvalidSecret")) {
        setError("Invalid email or password");
      } else {
        setError(err.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center w-screen justify-center min-h-screen px-4 py-10 bg-background text-foreground">
      <div className="w-full max-w-sm min-w-full sm:min-w-xs md:min-w-ms sm:max-w-md md:max-w-md bg-card shadow-lg rounded-xl p-6 sm:p-8 space-y-6 transition-all duration-300">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Student Sign In
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            Select your email and enter your password.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            {/* Email Select */}
            <CustomSelectSearch
              name="email"
              control={form.control}
              label="Student Email"
              options={students}
              placeholder="Select student"
            />

            {/* Password */}
            <CustomPasswordInput
              control={form.control}
              name="password"
              label="Password"
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Submit Button */}
            <SubmitButton
              type="submit"
              isLoading={loading}
              loadingText={loading ? "Signing In..." : "Signing Up..."}
              className="w-full"
            >
              {loading ? "Sign In" : "Sign Up"}
            </SubmitButton>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default UserSignIn;
