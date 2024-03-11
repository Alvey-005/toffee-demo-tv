import CardGrid from "../ui/CardGrid";
import Heading from "./Heading";

const ContentLayout = () => {
  return (
    <div className="ml-20 mr-8 mt-8">
      <Heading />
      <div className=" overflow-hidden">
        <CardGrid />
      </div>
    </div>
  );
};

export default ContentLayout;
