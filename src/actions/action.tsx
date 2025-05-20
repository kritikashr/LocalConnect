"use server"

export async function submitSignupForm(fromData : FormData)
{
    const email = fromData.get("email");
    const message = fromData.get("message");
    console.log(email, message);
}