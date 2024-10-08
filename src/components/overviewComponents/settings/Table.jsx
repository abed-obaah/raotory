import React from "react";
import { TrashIcon } from '@heroicons/react/24/solid';
const Table = () => {
    const thead = ['User’s Name', 'Status', 'Role']
    const users = [{
        name: 'Amos Rukky',
        status: 'Logged Out',
        role: 'Manager'
    }, {
        name: 'Amos Rukky',
        status: 'Active',
        role: 'Admin'
    }, {
        name: 'Amos Rukky',
        status: 'Logged Out',
        role: 'Admin'
    }, {
        name: 'Amos Rukky',
        status: 'Active',
        role: 'Manager'
    }, {
        name: 'Amos Rukky',
        status: 'Active',
        role: 'Manager'
    }, {
        name: 'Amos Rukky',
        status: 'Active',
        role: 'Admin'
    }]
    return (
        <>
            <table className="w-full mt-12">
                <thead className="w-full text-gray-400">
                    <tr className="w-full text-left">
                        {thead.map((th) => {
                            return (
                                <th className="px-9">{th}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody style={{ color: 'darkblue', fontWeight: '600' }}>
                    {users.map((user) => {
                        return (
                            <tr>
                                <td className="pl-9">{user.name}</td>
                                <td className="p-5 text-xs text-center font-bold"> {user.status === 'Active' ? <div className=" h-1/2 w-1/2 bg-green-200 border rounded-full py-2 px-2">{user.status}</div> : <div className=" w-1/2  h-1/2 bg-red-200 border rounded-full py-2 px-2">{user.status}</div>}</td>
                                <td className="p-5 text-xs text-center font-bold"> {user.role === 'Manager' ? <div className=" h-1/2  w-1/2 bg-yellow-300 border rounded-full py-2">{user.role}</div> : user.role === 'Admin' ? < div className=" h-1/2  w-1/2 bg-gray-400 border rounded-full py-2">{user.role}</div> : < div className=" h-1/2 bg-red-200 border rounded-full py-1">{user.role}</div>}</td>
                                <td className="text-center flex align-center mt-4 h-full"><button className="border bg-blue-600 px-7 py-1  text-white rounded">View</button><div className="bg-red-200 p-2 ml-5 rounded-full"><TrashIcon className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-700" /></div></td>

                            </tr>

                        )
                    })}
                </tbody>
            </table >
        </>
    )
}
export default Table;