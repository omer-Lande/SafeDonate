import {Link} from "react-router-dom";

const AssociationCard = ({name}) => {
    const link=`/AssociationPage/${name}`
    //console.log(name.name)
    
    return (
        <Link to={link}>
        <div className="text-2xl p-2">
             {name}
        </div>
        </Link>
    )
}

export default AssociationCard;