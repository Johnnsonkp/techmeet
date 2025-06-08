import LoginForm from "@/components/loginForm/LoginForm";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center m-4">
      <h1 className="text-3xl ny-3">Welcome </h1>
      <LoginForm />
    </div>
  );
}