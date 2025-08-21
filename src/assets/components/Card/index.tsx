import { FaRegClock } from "react-icons/fa";
import { GiSaltShaker, GiCupcake  } from "react-icons/gi";
import { IoPerson, IoHeart, IoHeartOutline } from "react-icons/io5";

interface ProjectCardProps {
    title: string;
    description: string;
    category?: string[];
    image?: string;
    hour?: number;
    minute?: number;
    portion?: string;
    isFavorite?: boolean;
}

const formatTime = (hour?: number, minute?: number) => {
    if (hour && minute) return `${hour} hr ${minute} min`;
    if (hour) return `${hour} hr`;
    if (minute) return `${minute} min`;
    return null;
};

const ProjectCard = ({
    title,
    description,
    category = [],
    image,
    hour,
    minute,
    portion,
    isFavorite = false,
}: ProjectCardProps) => {
    const timeLabel = formatTime(hour, minute);


    return (
        <div className="bg-background-200 rounded-3xl shadow-md p-6 w-2/12 relative">
            <div className="relative mb-4">
                <img
                src={image}
                alt={title}
                className="w-full h-40 object-cover rounded-2xl"
                />
                <div className="absolute top-4 right-4 flex gap-4 text-stone-600">
                    <button className="bg-white bg-opacity-70 rounded-full p-2">
                        {isFavorite ? (
                            <IoHeart />
                        ) : (
                            <IoHeartOutline />
                        )}
                    </button>
                </div>
            </div>
            <h3 className="text-xl text-left font-bold text-stone-600 mb-2">{title}</h3>
            <p className="text-stone-600 text-sm text-left mb-6">{description}</p>
            <div className="flex items-center gap-4 mb-4">
            {timeLabel && (
                <div className="flex items-center gap-2 bg-stone-50 rounded-full px-3 py-2 text-stone-600 text-sm">
                    <FaRegClock />
                    <span>{timeLabel}</span>
                </div>
            )}
            {portion && (
                    <span className="flex items-center gap-2 bg-stone-50 rounded-full px-3 py-2 text-stone-600 text-sm">
                        <IoPerson /> {portion}
                    </span>
                )}
            </div>
            <div className="flex gap-4 text-sm">
                {category.map((cat) => (
                    <span
                    key={cat}
                    className="flex items-center gap-2 bg-button-light rounded-full px-3 py-2 text-stone-50 text-sm"
                    >
                    {cat === "Salgado" && <GiSaltShaker className="text-xl" />}
                    {cat === "Doce" && <GiCupcake className="text-xl" />}
                    {cat}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ProjectCard;