import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/FirebaseConfig";

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const register = async () => {
        if (!email || !password) {
            return toast.error('Fill all required fields');
        }
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            toast.success('Registration Success');
            localStorage.setItem('admin', JSON.stringify(result));
            navigate('/adminlogin');
        } catch (error) {
            toast.error('Please use your Gmail Account');
            console.log(error);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-full max-w-[24rem]">
                <CardHeader color="pink" className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center">

                    <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-2 text-white">
                        <div className=" flex justify-center">
                            {/* Image  */}
                            <img src="https://cdn-icons-png.flaticon.com/128/727/727399.png"
                                className="h-20 w-20"
                            />
                        </div>
                    </div>


                    <Typography variant="h4" color="white">
                        Register
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input
                        label="Email"
                        size="lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        label="Password"
                        size="lg"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button onClick={register} color="pink" fullWidth>
                        Register
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
}
