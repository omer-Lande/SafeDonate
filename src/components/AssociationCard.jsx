import {Link} from "react-router-dom";
import FavoriteButton from "./FavoriteButton.jsx"

const AssociationCard = ({association, userId}) => {
    const name = association["שם עמותה בעברית"]
    const adress = association["כתובת - ישוב"]
    let target = association["מטרות עמותה"]? association["מטרות עמותה"] : "לא מוגדר" 
    target = target.replaceAll("~", ".\n");
    const link=`/AssociationPage/${name}`
    
    //console.log(name.name)
    
    return (
        <div className="space-y-4">
                <Link to={link}>
                    <div className="text-2xl p-2">{name} - {adress}</div>
                    <div>מטרות עמותה: {target}</div>
                </Link>
                <div className="flex justify-end ml-2">
                    <FavoriteButton association={association} userId={userId}/>
                </div>
        </div>
    )
}

export default AssociationCard;