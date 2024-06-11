import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { FreelancerStore } from '../helper/FreelancerStore';

type UserRoleData = {
    month: string;
    role: 'job_seeker' | 'job_provider' | 'admin';
    count: number;
};

type TransformedData = {
    month: string;
    job_seeker: number;
    job_provider: number;
    admin: number;
};

const transformData = (input: UserRoleData[]): TransformedData[] => {
    const transformedData: TransformedData[] = [];
    const months = Array.from(new Set(input.map(item => item.month))); // Convert Set to Array

    months.forEach(month => {
        const monthData: Partial<TransformedData> = { month };
        input.forEach(item => {
            if (item.month === month) {
                monthData[item.role] = item.count;
            }
        });
        transformedData.push({
            month,
            job_seeker: monthData.job_seeker || 0,
            job_provider: monthData.job_provider || 0,
            admin: monthData.admin || 0
        });
    });

    return transformedData;
};

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const formatMonth = (month: string): string => {
    const monthIndex = parseInt(month.split('-')[1], 10) - 1;
    return monthNames[monthIndex];
};

const UserLineChart: React.FC = () => {
    const [data, setData] = React.useState<TransformedData[]>([]);

    const getGraphHandler = async () => {
        try {
            const response = await (FreelancerStore.getState() as any).getGrowth();
            console.log(response.users);
            const transformedData = transformData(response.users);
            setData(transformedData);
        } catch (error: any) {
            if (error.response) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error(error.message);
            }
        }
    };

    React.useEffect(() => {
        getGraphHandler();
    }, []);

    return (
        <ResponsiveContainer width="80%" height={400}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="month" tickFormatter={formatMonth} label={{ value: 'Months', position: 'insideBottomRight', offset: -10 }} />
                <YAxis label={{ value: 'Number of People', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="job_seeker" stroke="#8884d8" name="Job Seekers" />
                <Line type="monotone" dataKey="job_provider" stroke="#82ca9d" name="Job Providers" />
                <Line type="monotone" dataKey="admin" stroke="#ffc107" name="Admins" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default UserLineChart;
