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
	const [positions,setPositions] = useState([]);

  useEffect(() => {
    fetch("https://s3.amazonaws.com/CMSTest/squaw_creek_container_info.xml?fbclid=IwAR0YUCBa-S_HrMLiXeJTsXdmBXJbLa3PoyCBjJKNlRggthLfNYcCxTogiuo")
        .then(res => res.text())
        .then(data => {
            var xml = new XMLParser().parseFromString(data); 
            var polygon0 = Cartesian3.fromDegreesArrayHeights(createPolygon(0,8,xml))
            var polygon1 = (Cartesian3.fromDegreesArrayHeights(createPolygon(7,14,xml)))
            var polygon2 = (Cartesian3.fromDegreesArrayHeights(createPolygon(14,18,xml)))
            var polygon3 = (Cartesian3.fromDegreesArrayHeights(createPolygon(17,22,xml)))
            var polygon4 = (Cartesian3.fromDegreesArrayHeights(createPolygon(22,25,xml)))
            var polygon5 = (Cartesian3.fromDegreesArrayHeights(createPolygon(25,28,xml)))
            var polygon6 = (Cartesian3.fromDegreesArrayHeights(createPolygon(28,31,xml)))
            var polygon7 = (Cartesian3.fromDegreesArrayHeights(createPolygon(31,34,xml)))
			setPositions(pre => [...pre,polygon0])
			setPositions(pre => [...pre,polygon1])
			setPositions(pre => [...pre,polygon2])
			setPositions(pre => [...pre,polygon3])
			setPositions(pre => [...pre,polygon4])
			setPositions(pre => [...pre,polygon5])
			setPositions(pre => [...pre,polygon6])
			setPositions(pre => [...pre,polygon7])
			
			
        })
        .catch(err => console.log(err));
},[])
	const renderPolygon = () =>{
		let xhml = null
			xhml = (	
				positions.map((pos , index) =>{	
					return (
						<Entity key={index}>
							<PolygonGraphics
								hierarchy={pos}
								perPositionHeight={true}
								material={Color.GREEN.withAlpha(0.5)}
								outline = {true}
								outlineColor = {Color.BLACK}
							/>
						</Entity>
						)
					})
				)
		return xhml
	}
  return (
    <div>
      <Viewer full>
		  
        {renderPolygon()}
        <CameraFlyTo  duration={8} 
            destination={Cartesian3.fromDegrees(-93.62033081054688, 42.01864242553711, 278.75982666015625)}     
        />
      </Viewer>
    </div>
    
  );
}

export default App;