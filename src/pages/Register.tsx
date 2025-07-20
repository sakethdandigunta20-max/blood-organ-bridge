import Header from "@/components/navigation/Header";
import RegistrationForm from "@/components/forms/RegistrationForm";

const Register = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12">
        <RegistrationForm />
      </main>
    </div>
  );
};

export default Register;