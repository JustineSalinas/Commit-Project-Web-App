import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SignUpPage() {
  return (
    <SignUp
      appearance={{
        baseTheme: dark,
        variables: {
          colorBackground: "#111113",
          colorInputBackground: "#18181B",
          colorInputText: "#FAFAFA",
          colorText: "#FAFAFA",
          colorTextSecondary: "#A1A1AA",
          colorPrimary: "#00FFAA",
          colorDanger: "#FF4757",
          borderRadius: "0.5rem",
          fontFamily: "inherit",
        },
        elements: {
          card: "shadow-none border border-[#1A1A1F] bg-[#111113]",
          headerTitle: "hidden",
          headerSubtitle: "hidden",
          socialButtonsBlockButton:
            "border border-[#27272A] bg-[#18181B] text-[#FAFAFA] hover:bg-[#27272A] transition-colors",
          formButtonPrimary:
            "bg-[#00FFAA] text-black font-semibold hover:bg-[#00E599] transition-colors",
          footerActionLink: "text-[#00FFAA] hover:text-[#00E599]",
          formFieldInput:
            "bg-[#18181B] border-[#27272A] text-[#FAFAFA] focus:border-[#00FFAA] focus:ring-[#00FFAA]/20",
          dividerLine: "bg-[#27272A]",
          dividerText: "text-[#71717A]",
        },
      }}
    />
  );
}
