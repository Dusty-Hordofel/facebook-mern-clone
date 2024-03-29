import { useRef } from 'react';
import EmojiPickerBackgrounds from './EmojiPickerBackgrounds';

export default function ImagePreview({
  text,
  user,
  setText,
  images,
  setImages,
}) {
  const imageInputRef = useRef(null);
  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img) => {
      const reader = new FileReader();
      reader.readAsDataURL(img); //readAsDataURL is a method that reads the contents of the specified Blob or File.
      reader.onload = (readerEvent) => {
        //readerEvent.target.result is the result of the read operation.readerEvent is used to access the result of the read operation.
        setImages((images) => [...images, readerEvent.target.result]);
      }; //onload is a method that is called when the read operation is finished.
    });
  };
  return (
    <div className="overflow_a">
      <EmojiPickerBackgrounds text={text} user={user} setText={setText} type2 />
      <div className="add_pics_wrap">
        <input
          type="file"
          multiple
          hidden
          ref={imageInputRef}
          onChange={handleImages}
        />
        {images && images.length ? (
          ''
        ) : (
          <div className="add_pics_inside1">
            <div className="small_white_circle">
              <i className="exit_icon"></i>
            </div>
            <div
              className="add_col"
              onClick={() => {
                imageInputRef.current.click();
              }}
            >
              <div className="add_circle">
                <i className="addPhoto_icon"></i>
              </div>
              <span>Add Photos/Videos</span>
              <span>or drag and drop</span>
            </div>
          </div>
        )}
        <div className="add_pics_inside2">
          <div className="add_circle">
            <i className="phone_icon"></i>
          </div>
          <div className="mobile_text">Add photos from your mobile device.</div>
          <span className="addphone_btn">Add</span>
        </div>
      </div>
    </div>
  );
}
