import { useParams } from "react-router-dom";

const AssociationPage = () => {
    const param = useParams();
    return (
        <div>
            AssociationPage {param.id}
        </div>
    )
}

export default AssociationPage;