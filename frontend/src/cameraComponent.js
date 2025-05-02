import React, { useState, useRef } from "react";
import "./camera.css";
import CameraEnhanceOutlinedIcon from "@mui/icons-material/CameraEnhanceOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";

import { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  Paper,
  CardActionArea,
  CardMedia,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import Clear from "@material-ui/icons/Clear";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { common } from "@material-ui/core/colors";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";

//width: "-webkit-fill-available", clearbutton
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  clearButton: {
    width: 500,
    borderRadius: "15px",
    padding: "10px 10px",
    color: "#000000a6",
    fontSize: "20px",
    fontWeight: 900,
    top: "-70px",
  },
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  media: {
    height: 400,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  gridContainer: {
    justifyContent: "right",
    padding: "4em 1em 0 1em",
  },
  mainContainer: {
    backgroundPosition: "right",
    height: "90vh",
    marginTop: "8px",
    marginRight: "10%",
  },
  imageCard: {
    margin: "auto",
    marginRight: "-12%",
    maxWidth: 500,
    height: 600,
    backgroundColor: "transparent",
    boxShadow: "0px 9px 70px 0px rgb(0 0 0 / 30%) !important",
    borderRadius: "15px",
  },
  imageCardEmpty: {
    height: "auto",
  },
  noImage: {
    margin: "auto",
    width: 400,
    height: "400 !important",
  },
  input: {
    display: "none",
  },
  uploadIcon: {
    background: "white",
  },
  tableContainer: {
    backgroundColor: "transparent !important",
    boxShadow: "none !important",
  },
  table: {
    backgroundColor: "transparent !important",
  },
  tableHead: {
    backgroundColor: "transparent !important",
  },
  tableRow: {
    backgroundColor: "transparent !important",
  },
  tableCell: {
    fontSize: "22px",
    backgroundColor: "transparent !important",
    borderColor: "transparent !important",
    color: "#000000a6 !important",
    fontWeight: "bolder",
    padding: "1px 24px 1px 16px",
  },
  tableCell1: {
    fontSize: "14px",
    backgroundColor: "transparent !important",
    borderColor: "transparent !important",
    color: "#000000a6 !important",
    fontWeight: "bolder",
    padding: "1px 24px 1px 16px",
  },
  tableBody: {
    backgroundColor: "transparent !important",
  },
  text: {
    color: "white !important",
    textAlign: "center",
  },
  buttonGrid: {
    maxWidth: "416px",
    width: "100%",
  },
  detail: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  appbar: {
    background: "lightgreen",
    boxShadow: "none",
    color: "black",
  },
  loader: {
    color: "#be6a77 !important",
  },
}));

const CameraCard = () => {
  const classes = useStyles();//I apply an custom styles
  const [selectedFile, setSelectedFile] = useState();//para han file/Image nga napili / State para han napili nga file/image tikang user.
  const [preview, setPreview] = useState();//para han image preview - State para han preview URL han image (para makita anay bago i-upload).
  const [data, setData] = useState();//Para han data tikang ha API/ State para han data tikang ha backend pagkahuman ma-process an image.
  const [image, setImage] = useState(false);// state kun may image na napili or waray as default naka false kay waray pa man image na napili -- Boolean flag kung may ada image o waray.
  const [isLoading, setIsloading] = useState(false);//para han loading state -- Boolean flag kung naglo-loading an pag-upload o pag-process han image.
  let confidence = 0;

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(common.white),
      backgroundColor: common.white,
      "&:hover": {
        backgroundColor: "#ffffff7a",
      },
    },
  }))(Button);
  const axios = require("axios").default;// Gin-gamit an Axios para magpadara hin HTTP requests ngadto ha backend API.

  const sendFile = async () => {//Paghimo hin asynchronous nga function nga gin-ngangaranan sendFile.Asynchronous buot sidngon nga pwede maghulat hin request nga tapuson anay antes magpadayon.
    if (image) {//Ginbubuhat la ini kon may-ada na nga image nga napili.I-check kon an image variable nagsusumat nga may image na ba an user.
      let formData = new FormData();//Naghihimo hin bag-o nga FormData object.Ini nga klase ginagamit ha pag-andam hin data nga ipapadara ha server, labi na kon file ini.
      formData.append("file", selectedFile);//Ginbubutang ha formData an image nga napili.Gin-ngangaranan nga "file" an field name, ngan an value amo an selectedFile (an image).
      let res = await axios({// Nagpapadara hin POST request gamit an axios // await buot sidngon maghulat anay nga matapos an request.
        method: "post",
        url: process.env.REACT_APP_API_URL,//url tikang ha environment variable REACT_APP_API_URL, amo an address han server.
        data: formData,//data: formData buot sidngon an formData amo an ipapadara.
      });
      if (res.status === 200) {//Ginkukumpirma kon okay an response tikang ha server (status code 200).
        setData(res.data);//Ginbubutang ha data variable an baton han server.Bisan ano nga resulta nga iginbalik han server ha response body, ginsisave didto.
      }
      setIsloading(false);//Iginbabalik an isLoading ha false—nagsusumat nga tapos na an proseso.
    }
  };

  // Nagdedeklara hin function nga ginngangaranan clearData.
  // Ini nga function waray ginbabalik nga value, ngan ginagamit para limpyuhan o i-reset an mga data ha form.
  const clearData = () => {
    setData(null);// Gin-aayad o ginrereset an data nga variable ngadto ha null.Iton buot sidngon, ginkakawara an resulta tikang ha previous nga response han server.
    setImage(false);//Ginbabag-o an estado han image nga variable ngadto ha false.Iton buot sidngon, ginsusumat nga waray image nga napili.
    setSelectedFile(null);//Ginrereset an selectedFile ngadto ha null.Ginkakawara an image file nga ginpili han user.
    setPreview(null);//Ginrereset an preview ngadto ha null.Iton buot sidngon, ginkakawara an thumbnail o preview han image.
  };

  //Nag-gagamit kita hin useEffect hook — ginagamit ini ha React para maghimo hin epekto kada may kabag-ohan ha data o component lifecycle.
  //Ini nga particular nga effect nagbabantay han selectedFile
  useEffect(() => {
    if (!selectedFile) {//Kon waray napili nga file (selectedFile),susunod nga buhaton amo an pag-reset han preview.
      setPreview(undefined);//Ginbabag-o an estado han preview ngadto ha undefined — ginkakawara an ginpapakita nga preview image.
      return;//Nag-iinopay an code ngan dire na padayonon an sunod nga linya.Iton buot sidngon, kon waray file, di na maghihimo hin object URL.
    }
    const objectUrl = URL.createObjectURL(selectedFile);//Ginbubuhat an temporary URL (objectUrl) para ha napili nga file (selectedFile).Ginagamit ini nga URL para ipakita an preview han image nga waray pa na-upload.
    setPreview(objectUrl);//Ginbubutang an objectUrl ngadto ha preview.An resulta, makikita ha UI an preview han image base han temporary nga URL.
  }, [selectedFile]);//Ginbubutang an objectUrl ngadto ha preview.An resulta, makikita ha UI an preview han image base han temporary nga URL.


// Nag-gagamit hin useEffect — ginagamit ha React para maghimo hin epekto kada may kabag-ohan ha data o component lifecycle.
// Ini nga effect ginbabantayan la an preview.
  useEffect(() => {
    if (!preview) {//Kon waray sulod an preview — buot sidngon waray image nga gin-assign para ipakita.
      return;//Dire na itutuloy an iba nga code kon waray preview.Nag-iinopay an function ngan waray buhaton.
    }
//     Gin-seset an estado nga isLoading ngadto ha true.
// Iton buot sidngon, nagpapakita nga nagtitikang o nagkakadto ha proseso hin loading (e.g. uploading, sending, etc.)
// Makikita ini ha UI (e.g., spinner, loading bar).
    setIsloading(true);
    sendFile();//Gintatawag an sendFile() nga function.Ini nga function amo an nagpapadara han file ngadto ha backend server.
    sendFileImage();//Gintatawag liwat an sendFileImage() nga function.Siguro ini hiya iba nga klaseng proseso — pananglitan, pag-send hin raw image data o pagpadara ngadto ha la-in nga endpoint. 
  }, [preview]);//It effect madadara la kon mabag-o an preview.
  // Iton buot sidngon, kon may bag-o nga preview (pananglitan, may napili nga image),
  // automatic nga magse-set hin loading status ngan magpapadara hin file.

  const onSelectFile = (files) => {// Ini nga function ginbubuhat ha tuwing may napipili nga file — pananglitan tikang ha file input field (e.g., image upload).
    if (!files || files.length === 0) {//Gin checheck kon waray sulod an files o zero an iya ginhupot.Buot sidngon, waray user nga napili nga file o waray napasa nga file.      
      setSelectedFile(undefined);//Gin bubutang nga undefined aan setSelected file kun waray may napili na file or unsupported.
      setImage(false);//Gin bubutang nga false para magpasabot nga waray valid nga image na na upload
      setData(undefined);//Gin lilimpyo an data basi waray magpadayon han daan nga result/data
      return;//gin uundang kay waray man valid na file
    }
    setSelectedFile(files[0]);//Kun may file nga napili, gin bubutang ini ha selectedFile gin kuha an syahan na array(files[0]).
    setData(undefined);//gin cleaning para an daan na data, para han susunnod na bago na upload.
    setImage(true);//gin bubutang nga true an imag buot sidngon na may image nga na upload.
  };

  if (data) {//Gin checheck kun may sulod an data or kun waray...  kun may sulod an data mapadayon pag execute hine na code block.
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);//gin kukuha an score tikang ha data.confidence gin multiply ha 100 nga mat duha la ka decimal value la 
  }
  //Pag taawag la han mga functions
  const onCaptureImage = (capturedImageData) => {
    // Here, you can directly use the captured image data (data URL) in your ImageUpload component
    setData(undefined);
    setImage(true);
    setIsloading(true); // Assuming you want to trigger the image processing on capture
    sendFile();//pag send file na funciton
    processImage();//pag process na han image na function
    sendFileImage();//pag send hin file na function.
  };

  // State to manage the camera stream
//   Nagdedeklara ini hin variable nga stream gamit an useState, nga may inisyal nga kantidad nga null. 
//Ginagamit ini ha mga kaso kun diin gusto nimo kuhaon o gamiton an video stream tikang ha camera, sugad han pag-capture hin live video o image.
// stream — amo an variable nga nagtitinipig han video stream o media stream data.
// setStream — amo an function nga ginagamit para bag-uhon an kantidad han stream.

// null — nangangahulogan nga waray pa nakaset nga video stream ha tinikangan.
  const [stream, setStream] = useState(null);

  // Refs to access the video and canvas elements
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // State to manage the position of the captured image
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  // Function to start the camera
  const startCamera = async () => {
    try {
      // Request access to the user's camera
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      // Set the camera stream to the state
      setStream(mediaStream);

      // If the video element is available, set its source to the camera stream
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  // Function to stop the camera
  const stopCamera = () => {
    // Check if there is an active camera stream
    if (stream) {
      // Get all tracks from the stream and stop them
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      // Set the camera stream in the state to null
      setStream(null);
    }
  };

  // Function to capture an image from the camera feed
  const captureImage = () => {
    // Check if both video and canvas elements are available
    if (videoRef.current && canvasRef.current) {
      // Get the 2D drawing context of the canvas
      const context = canvasRef.current.getContext("2d");
      // Draw the current frame of the video onto the canvas
      //context.drawImage(videoRef.current, 0, 0, 300, 200); // Adjust dimensions as needed
      const width = videoRef.current.videoWidth;
      const height = videoRef.current.videoHeight;

      canvasRef.current.width = width;
      canvasRef.current.height = height;

      context.drawImage(videoRef.current, 0, 0, width, height);

      // Apply image enhancements
      enhanceImage(context);

      // Use the callback of toDataURL
      canvasRef.current.toDataURL("image/jpeg", (dataUrl) => {
        // Trigger the onCaptureImage callback with the captured image data
        onCaptureImage(dataUrl);
      });
    }
  };

  // Function to apply image enhancements
  const enhanceImage = (context) => {
    // Example: Apply a sharpening filter
    const imageData = context.getImageData(
      0,
      0,
      context.canvas.width,
      context.canvas.height
    );
    // Apply sharpening algorithm to imageData
    // Replace the imageData on the canvas
    context.putImageData(imageData, 0, 0);

    // Other enhancements (noise reduction, contrast adjustment) can be implemented similarly
  };

  // Function to clear the captured image
  const clearCapture = () => {
    // Check if the canvas element is available
    if (canvasRef.current) {
      // Get the 2D drawing context of the canvas and clear it
      const context = canvasRef.current.getContext("2d");
      context.clearRect(0, 0, 700, 600); // Adjust dimensions as needed
    }
  };

  const downloadImage = () => {
    // Get the data URL of the captured image from the canvas
    const dataUrl = canvasRef.current.toDataURL("image/jpeg");

    // Create a link element
    const downloadLink = document.createElement("a");

    // Set the href attribute with the data URL
    downloadLink.href = dataUrl;

    // Set the download attribute with a desired filename
    downloadLink.download = "captured_image.jpeg";

    // Trigger a click event on the link to start the download
    downloadLink.click();
  };

  const processImage = () => {
    if (canvasRef.current && videoRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      // Set canvas dimensions to match video dimensions
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;

      // Draw the current frame of the video onto the canvas
      ctx.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      // Get the data URL of the captured image from the canvas
      const dataUrl = canvasRef.current.toDataURL("image/jpeg");

      // Create a FormData object
      const formData = new FormData();

      // Convert the data URL to a Blob
      const blob = dataURLtoBlob(dataUrl);

      // Pass the blob to the setSelectedFile function
      setSelectedFile(blob);
      // Append the Blob to the FormData object
      formData.append("file", blob);

      // Send the file to the server
      setIsloading(true);
      //sendFile(formData);
      sendFileImage(blob);
      //sendFileToServer();
    }
  };

  // Function to convert a data URL to a Blob
  const dataURLtoBlob = (dataUrl) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const sendFileImage = async (blob) => {
    try {
      const formData = new FormData();
      formData.append("file", blob);

      const response = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL,
        data: formData,
      });

      if (response.status === 200) {
        // Handle successful response
        console.log("Image sent successfully!");
      } else {
        setIsloading(false);

        // Handle other response statuses
        console.error("Failed to send image.");
      }
    } catch (error) {
      // Handle errors
      console.error("Error sending image:", error);
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="camera-card">
      <Container
        maxWidth={false}
        className={classes.mainContainer}
        disableGutters={true}
      >
        <Grid
          className={classes.gridContainer}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {/* Live Feed Section */}
          <Grid item xs={12} md={6}>
            {/* Video element to display the camera stream */}
            {stream && (
              <div className="video-capture-container">
                <video
                  className="livePreview"
                  ref={videoRef}
                  autoPlay
                  playsInline
                />

                <canvas
                  className="capturedImage"
                  ref={canvasRef}
                  position="relative"
                  width="300"
                  height="200"
                />

                {/* Buttons for capturing, clearing, and stopping the camera */}
                <div className="btnDiv">
                  <button className="captureBtn" onClick={processImage}>
                    <CameraEnhanceOutlinedIcon fontSize="large" />
                    <br />
                    Capture
                  </button>
                  <button className="clearBtn" onClick={clearCapture}>
                    <CancelOutlinedIcon fontSize="large" />
                    <br />
                    Clear
                  </button>
                  <button className="stopBtn" onClick={stopCamera}>
                    <StopCircleOutlinedIcon fontSize="large" />
                    <br /> Stop
                  </button>
                  <button className="downloadBtn" onClick={downloadImage}>
                    <DownloadForOfflineOutlinedIcon fontSize="large" />
                    <br /> Download
                  </button>

                  <button className="reloadBtn" onClick={refreshPage}>
                    <RefreshOutlinedIcon />
                    <br /> Reload
                  </button>
                </div>
              </div>
            )}

            {/* If there is no camera stream, display a button to start the camera */}
            {!stream && (
              <div className="camera-container">
                <button className="startBtn" onClick={startCamera}>
                  Start Camera
                </button>
              </div>
            )}
          </Grid>

          {/* Container Section */}
          <Grid item xs={12} md={6}>
            <Card
              className={`${classes.imageCard} ${
                !image ? classes.imageCardEmpty : ""
              }`}
            >
              {preview && (
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={preview}
                    component="img"
                    title="Image Sample"
                  />
                </CardActionArea>
              )}
              {!image && (
                <CardContent className={classes.content}>
                  <DropzoneArea
                    acceptedFiles={["image/*"]}
                    dropzoneText={
                      "Potato Image Captured using Camera Will Be Processed Here"
                    }
                    onChange={onSelectFile}
                  />
                </CardContent>
              )}
              {data && (
                <CardContent className={classes.detail}>
                  <TableContainer
                    component={Paper}
                    className={classes.tableContainer}
                  >
                    <Table
                      className={classes.table}
                      size="small"
                      aria-label="simple table"
                    >
                      <TableHead className={classes.tableHead}>
                        <TableRow className={classes.tableRow}>
                          <TableCell className={classes.tableCell1}>
                            Label:
                          </TableCell>
                          <TableCell
                            align="right"
                            className={classes.tableCell1}
                          >
                            Confidence:
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody className={classes.tableBody}>
                        <TableRow className={classes.tableRow}>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableCell}
                          >
                            {data.class}
                          </TableCell>
                          <TableCell
                            align="right"
                            className={classes.tableCell}
                          >
                            {confidence}%
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              )}
              {isLoading && (
                <CardContent className={classes.detail}>
                  <CircularProgress
                    color="secondary"
                    className={classes.loader}
                  />
                  <Typography className={classes.title} variant="h6" noWrap>
                    Processing
                  </Typography>
                </CardContent>
              )}
            </Card>
          </Grid>

          {data && (
            <Grid item className={classes.buttonGrid}>
              <ColorButton
                variant="contained"
                className={classes.clearButton}
                color="primary"
                component="span"
                size="large"
                onClick={clearData}
                startIcon={<Clear fontSize="large" />}
              >
                Clear
              </ColorButton>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default CameraCard;

//<Draggable bounds="parent" position={imagePosition} onDrag={handleDrag}> content to be dragable </Dragable>
