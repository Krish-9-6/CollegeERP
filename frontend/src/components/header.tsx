import { ChevronDown } from 'lucide-react';
import '../styles/header.css';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
    const { user } = useAuth();
    return (
        <>
            <header className="header">
                <div className='header-content'>
                    <h1 className='header-title'>Student Dashboard</h1>
                </div>
                <button className='user-btn'>
                    <div className='user-icon' />
                    <div className='user-name'>
                        {user?.full_name}
                    </div>
                    <ChevronDown className='chev-dwn' />
                </button>
            </header>
        </>
    );
}