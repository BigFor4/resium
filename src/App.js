import React, { useEffect, useState } from "react";
import { Ion,Cartesian3, Color } from "cesium";
import { Viewer, Entity, PolygonGraphics , CameraFlyTo} from "resium";
import XMLParser from 'react-xml-parser';

function App() {
  Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3Yjg0MDg0Ny03ZjhhLTRjYTYtYTZkYy0wN2I2NmQxMDI5MzEiLCJpZCI6NzU0ODgsImlhdCI6MTYzODY3NDIzMX0.YgUxCvWMj0vQRZVspSIzkDAbfwziosVYq9gLWDaRjAI';
  const  createPolygon = (start, end ,data) => {
      var array = [];
      for (var i = start; i < end; i++) {
          for (var j = 0; j < 3; j++) {
              var point = parseFloat((data.children[0].children[2].children[i].attributes.data.split(", ")[j]))
              if(j===2){
                point = point - 277
              }
              array.push(point);
          }

      }
      return array
  }
  const [positions0,setPositions0] = useState([]);
  const [positions1,setPositions1] = useState([]);
  const [positions2,setPositions2] = useState([]);
  const [positions3,setPositions3] = useState([]);
  const [positions4,setPositions4] = useState([]);
  const [positions5,setPositions5] = useState([]);
  const [positions6,setPositions6] = useState([]);
  const [positions7,setPositions7] = useState([]);
  useEffect(() => {
    fetch("https://s3.amazonaws.com/CMSTest/squaw_creek_container_info.xml?fbclid=IwAR0YUCBa-S_HrMLiXeJTsXdmBXJbLa3PoyCBjJKNlRggthLfNYcCxTogiuo")
        .then(res => res.text())
        .then(data => {
            var xml = new XMLParser().parseFromString(data); 
            setPositions0(Cartesian3.fromDegreesArrayHeights(createPolygon(0,8,xml)))
            setPositions1(Cartesian3.fromDegreesArrayHeights(createPolygon(7,14,xml)))
            setPositions2(Cartesian3.fromDegreesArrayHeights(createPolygon(14,18,xml)))
            setPositions3(Cartesian3.fromDegreesArrayHeights(createPolygon(17,22,xml)))
            setPositions4(Cartesian3.fromDegreesArrayHeights(createPolygon(22,25,xml)))
            setPositions5(Cartesian3.fromDegreesArrayHeights(createPolygon(25,28,xml)))
            setPositions6(Cartesian3.fromDegreesArrayHeights(createPolygon(28,31,xml)))
            setPositions7(Cartesian3.fromDegreesArrayHeights(createPolygon(31,34,xml)))
        })
        .catch(err => console.log(err));
},[])
  return (
    <div>
      <Viewer full>
        <Entity>
          <PolygonGraphics
              hierarchy={positions0}
              perPositionHeight={true}
              material={Color.GREEN.withAlpha(0.5)}
              outline = {true}
              outlineColor = {Color.BLACK}
            />
        </Entity>
        <Entity>
          <PolygonGraphics
              hierarchy={positions1}
              perPositionHeight={true}
              material={Color.GREEN.withAlpha(0.5)}
              outline = {true}
              outlineColor = {Color.BLACK}
            />
        </Entity>
        <Entity>
          <PolygonGraphics
              hierarchy={positions2}
              perPositionHeight={true}
              material={Color.GREEN.withAlpha(0.5)}
              outline = {true}
              outlineColor = {Color.BLACK}
            />
        </Entity>
        <Entity>
          <PolygonGraphics
              hierarchy={positions3}
              perPositionHeight={true}
              material={Color.GREEN.withAlpha(0.5)}
              outline = {true}
              outlineColor = {Color.BLACK}
            />
        </Entity>
        <Entity>
          <PolygonGraphics
              hierarchy={positions4}
              perPositionHeight={true}
              material={Color.GREEN.withAlpha(0.5)}
              outline = {true}
              outlineColor = {Color.BLACK}
            />
        </Entity>
        <Entity>
          <PolygonGraphics
              hierarchy={positions5}
              perPositionHeight={true}
              material={Color.GREEN.withAlpha(0.5)}
              outline = {true}
              outlineColor = {Color.BLACK}
            />
        </Entity>
        <Entity>
          <PolygonGraphics
              hierarchy={positions6}
              perPositionHeight={true}
              material={Color.GREEN.withAlpha(0.5)}
              outline = {true}
              outlineColor = {Color.BLACK}
            />
        </Entity>
        <Entity>
          <PolygonGraphics
              hierarchy={positions7}
              perPositionHeight={true}
              material={Color.GREEN.withAlpha(0.5)}
              outline = {true}
              outlineColor = {Color.BLACK}
            />
        </Entity>
        <CameraFlyTo  duration={8} 
                  destination={Cartesian3.fromDegrees(-93.62033081054688, 42.01864242553711, 278.75982666015625)}     
                  />
      </Viewer>
    </div>
    
  );
}

export default App;