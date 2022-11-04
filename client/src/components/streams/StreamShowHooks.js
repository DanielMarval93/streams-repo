import React, {useEffect, useRef} from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream} from "../../actions";

const StreamShow = props =>{
   
   const videoRef= React.createRef();
  
   useEffect(() => {        
      props.fetchStream(props.match.params.id);
      buildPlayer();
   },[])

   useEffect(() => {        
      buildPlayer();
   })


   const buildPlayer = ()=>{
      const player = flv.createPlayer({
         type: "flv",
         url:`http://localhost:8000/live/${props.match.params.id}.flv`,
      });

      if (player || !props.stream){
         return;
      }

      player.attachMediaElement(videoRef.current);
      player.load();
   }

   

   const renderHeader = () =>{
         if (!props.stream) {
             return <div></div>;
         };

   const { title, description} = props.stream;
 
   return (
         <div>
            <video ref={videoRef} style={{width: '100%'}} controls/>
            <h1>{title}</h1>
            <h5>{description}</h5>
         </div>
         );
     }   
   
   return (
      <div>
         <div></div>
         <div>
            {renderHeader()}
         </div>
      </div>
   )
};

const mapStateToProps=(state, ownProps) =>{
   return {stream: state.streams[ownProps.match.params.id]}
};

export default connect(mapStateToProps,{fetchStream})(StreamShow);