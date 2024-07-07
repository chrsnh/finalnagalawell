import React, { useContext, useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import myContext from "../../../context/data/myContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/FirebaseConfig";

export default function AdminLogin() {
    const context = useContext(myContext);
    const { mode } = context;

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        if (!email || !password) {
            return toast.error('Fill all required fields')
        }
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            toast.success('Login Success')
            localStorage.setItem('admin', JSON.stringify(result));
            navigate('/')
        } catch {
            toast.error('Register ka muna')
            console.log(error)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <div className="flex justify-center items-center h-screen">

            {/* Card  */}
            <Card className="w-full max-w-[24rem]">
                {/* CardHeader */}
                <CardHeader
                    color="pink"
                    className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
                >
                    <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-2 text-white">
                        <div className=" flex justify-center">
                            {/* Image  */}
                            <img src="https://cdn-icons-png.flaticon.com/128/727/727399.png"
                                className="h-20 w-20"
                            />
                        </div>
                    </div>

                    {/* Top Haeding  */}
                    <Typography variant="h4" style={{
                        color: mode === 'dark'
                            ? 'rgb(30, 41, 59)'
                            : 'rgb(226, 232, 240)'
                    }}>
                        Login
                    </Typography>
                </CardHeader>

                {/* CardBody */}
                <CardBody>
                    <form className=" flex flex-col gap-4">
                        {/* First Input  */}
                        <div>
                            <Input
                                type="email"
                                label="Email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {/* Second Input  */}
                        <div>
                            <Input
                                type="password"
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {/* Login Button  */}
                        <Button onClick={login} color="pink" fullWidth>
                            login
                        </Button>
                        <Typography className="mt-4 text-center">
                            Don't have an account? <Link to="/adminregister" className="text-blue-500">Register</Link>
                        </Typography>
                    </form>
                </CardBody>
            </Card>
        </div>


    );
} 