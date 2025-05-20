"use server"

export async function submitEmailForm(formData : FormData)
{
    const email = formData.get("email");
    console.log(email);
}