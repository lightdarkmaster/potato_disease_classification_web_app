import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
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
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

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
    marginRight: "-17%",
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
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
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
  const axios = require("axios").default;

  const sendFile = async () => {
    if (image) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      let res = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL,
        data: formData,
      });
      if (res.status === 200) {
        setData(res.data);
      }
      setIsloading(false);
    }
  };

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    setIsloading(true);
    sendFile();
    sendFileImage();
  }, [preview]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }
  const onCaptureImage = (capturedImageData) => {
    // Here, you can directly use the captured image data (data URL) in your ImageUpload component
    setData(undefined);
    setImage(true);
    setIsloading(true); // Assuming you want to trigger the image processing on capture
    sendFile();
    processImage();
    sendFileImage();
  };

  // State to manage the camera stream
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
                      "Capture Leaf Image Will Be Processed Here"
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