import { collapseClasses } from "@mui/material";
import React from "react";

const Table = () => {
    const customers = [
        {
            name: "Desmond",
            number: '09169626877',
            gender: 'male',
            location: 'Abraka, Delta'
        },
        {
            name: "Desmond",
            number: '09169626877',
            gender: 'female',
            location: 'Abraka, Delta'
        },
        {
            name: "Desmond",
            number: '09169626877',
            gender: 'female',
            location: 'Abraka, Delta'
        },
        {
            name: "Desmond",
            number: '09169626877',
            gender: 'male',
            location: 'Abraka, Delta'
        },
        {
            name: "Desmond",
            number: '09169626877',
            gender: 'male',
            location: 'Abraka, Delta'
        },
        {
            name: "Desmond",
            number: '09169626877',
            gender: 'female',
            location: 'Abraka, Delta'
        }
    ];

    const cols = ['Customer Name', 'Phone Number', "Gender", "Location"];

    return (
        <table className="w-full p-8 border-collapse">
            <thead className="bg-gray-100">
                <tr>
                    {cols.map((col) => (
                        <th key={col} className="p-3 text-gray-400 text-left">{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {customers.map((person, index) => (
                    <tr key={index} className="mb-4">
                        <td className="p-3   bg-white ">
                            {person.name}
                        </td>
                        <td className="p-3    bg-white ">
                            {person.number}
                        </td>
                        <td className="p-3   bg-white ">
                            {person.gender === 'male' ? (
                                <p className="icon bg-blue-100 text-blue-900 font-bold text-center flex justify-center items-center h-8 w-8 rounded-full">M</p>
                            ) : (
                                <p className="icon bg-gray-100 text-blue-900 font-bold text-center flex justify-center items-center h-8 w-8 rounded-full">F</p>
                            )}
                        </td>
                        <td className="p-3 flex bg-white">
                            {person.location}
                            <div className="btns flex w-1/2">

                                <button className="bg-blue-500 p-1 text-white w-full rounded-lg ml-5">Modify</button>
                                <button className="h-7 w-10 bg-red-300 ml-5 rounded-full"></button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
