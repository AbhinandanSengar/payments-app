import { useNavigate } from 'react-router-dom'

export const Bottom = ({ title, linkText, linkTo }) => {
    const navigate = useNavigate();
    return (
        <div className="">
            <span>
                {title}&nbsp;
            </span>
            <span onClick={() => navigate(linkTo)} className="underline text-blue-600 cursor-pointer">
                {linkText}
            </span>
        </div>
    )
}