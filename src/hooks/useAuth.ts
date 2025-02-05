import { User } from "@/utils/types/user";
import { useRouter } from "next/navigation";
import { useUser } from "./useUser";

export const useAuth = () => {
  const { setUser } = useUser();
  const navigate = useRouter();

  const login = async (
    usuario: string,
    password: string,
    isSalved: boolean,
    route: string
  ) => {
    const user: User = {
      id: 1,
      email: usuario,
      senha: password,
    };

    if (isSalved) {
      localStorage.setItem("userStorage", JSON.stringify(user));
    } else {
      sessionStorage.setItem("userStorage", JSON.stringify(user));
    }

    // navigate.push("/dashboard/cadastro");

    // setIsActiveLoading(true);
    // try {
    //   const response = await baseApi.post<ResponseAPI<ResponseData<User>>>("/login", {
    //     usuario,
    //     senha: password,
    //   });

    //   toast.success('Login realizado com sucesso!');

    //   const user: User = response.data.body.data;
    //   setUser(user);

    //   if (isSalved) {
    //     localStorage.setItem("userStorage", JSON.stringify(user));
    //   } else {
    //     sessionStorage.setItem("userStorage", JSON.stringify(user));
    //   }

    //   navigate(route);
    // } catch (error) {
    //   const axiosError = error as AxiosError<{ body: { error?: {message: string, email?: string, senha?: string}, message: string }, statusCode: number }>;
    //   console.error("Login failed", axiosError);
    //   if (axiosError.response) {
    //     if(axiosError.response.data.body.error != undefined){
    //       if(axiosError.response.data.body.error.email != undefined){
    //         toast.error(axiosError.response.data.body.error.email);
    //       }else if(axiosError.response.data.body.error.senha != undefined){
    //         toast.error(axiosError.response.data.body.error.senha);
    //       }else{
    //         toast.error(axiosError.response.data.body.error.message);
    //       }
    //     }else{
    //       toast.error(axiosError.response.data.body.message);
    //     }
    //   } else {
    //     toast.error(axiosError.message);
    //   }

    //   console.error("Login failed", axiosError);
    //   throw axiosError;
    // } finally {
    //   setIsActiveLoading(false);
    // }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("userStorage");
    localStorage.removeItem("userStorage");
    navigate.push("/");
  };

  return { login, logout };
};
