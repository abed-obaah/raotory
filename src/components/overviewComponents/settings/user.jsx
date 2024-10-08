import React, { useState } from "react";
import Table from './Table'
import { MagnifyingGlassIcon, UserPlusIcon, PaperAirplaneIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const User = () => {
    const [tab, setTab] = useState('user')
    const first = () => {
        function handleClick() {
            setTab('Adduser')
        }
        return (
            <>
                <div className="flex justify-between">
                    <div className=""><h1 className="font-semibold text-2xl">User Management</h1>
                        <p className="text-gray-400 text-xs font-semibold">Manage your staff roles easily</p>
                    </div>
                    <form action="" className=" flex w-1/2 gap-3">
                        <div className="flex relative items-center mb-5 w-2/3">
                            <MagnifyingGlassIcon
                                className="h-8 w-8  p-1 rounded-full ml-2 absolute cursor-pointer text-gray-400"

                            />
                            <input
                                type="text"
                                className="w-full border rounded-lg p-3 pl-10"
                                placeholder="Search User"

                                style={{ backgroundColor: 'white', color: 'darkblue' }}
                            />
                        </div>
                        <button className="w-1/3 border bg-blue-500 text-white h-12 flex  align-center pl-12 pt-3 gap-1 font-semibold rounded-lg" onClick={handleClick}><UserPlusIcon height='20px' />Add User</button>
                    </form>
                </div>
                <Table />
            </>
        )
    }
    const Add = () => {
        return (
            <>
                <form action="">
                    <h1 className="font-semibold text-2xl">New User</h1>
                    <p className="text-xs text-gray-400">Add a new user</p>

                    <input type="email" placeholder="Input User Email" className="border w-full mt-5 mb-4 p-4 rounded-lg" />

                    <h2 className="font-semibold text-2xl mt-14">Choose Role</h2>
                    <p className="text-xs text-gray">Assign new user to a role</p>
                    <div className="flex mt-2 align-center justify-start font-semibold text-blue-900">
                        <div className="border p-2 m-4" style={{ width: '250px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <input type="radio" name="role" id="manager" style={{ transform: "scale(3)", margin: '20px' }} /><span className="h-1/2 w-1/2 bg-yellow-300 border rounded-full py-1 px-3 text-center">Manager</span>
                        </div>
                        <div className="border p-2 m-4" style={{ width: '250px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <input type="radio" name="role" id="manager" style={{ transform: "scale(3)", margin: '20px' }} /><span className="h-1/2  w-1/2 bg-gray-500 border rounded-full py-1 px-3 text-center">Admin</span>
                        </div>
                        <div className="border p-2 m-4" style={{ width: '250px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <input type="radio" name="role" id="manager" style={{ transform: "scale(3)", margin: '20px' }} /><span className="h-1/2  w-1/2 bg-red-400 border rounded-full py-1 px-3 text-center">Sales Rep</span>
                        </div></div>
                </form>
                <a href=""><p className="text-sm text-blue-700 flex gap-2"><QuestionMarkCircleIcon height='20px' />See what each role can access</p>   </a>
                <button className="flex align-center justify-center p-4 w-1/4 bg-blue-500 font-semibold text-white gap-4 border mt-10"><PaperAirplaneIcon height="20px" />Send Invite</button>
            </>
        )
    }
    switch (tab) {
        case "user":
            return first();
        case "Adduser":
            return Add();
        default:
            setTab('user')
            break;
    }
}

export default User;