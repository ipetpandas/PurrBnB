import { useSelector } from "react-redux";

const SpotImages = () => {
  const singleSpot = useSelector((state) => state.spots.spot);

  const spotImages = singleSpot.SpotImages;
  const previewImage = spotImages?.find((image) => image.preview === true);
  let nonPreviewImages = spotImages?.filter((image) => image.preview !== true);
  nonPreviewImages = nonPreviewImages?.slice(0, 4);

  let imageGrid;
  if (nonPreviewImages?.length === 4) {
    imageGrid = (
      <div className="image-grid">
        <img className="large-preview" src={previewImage?.url} />
        <div className="rest-preview">
          {nonPreviewImages?.map((image) => (
            <img className="small-previews" key={image.id} src={image.url} />
          ))}
        </div>
      </div>
    );
  } else {
    imageGrid = (
      <div className="single-image-grid">
        <img className="large-preview" src={previewImage?.url} />
      </div>
    );
  }

  return { imageGrid };
};

export default SpotImages;
