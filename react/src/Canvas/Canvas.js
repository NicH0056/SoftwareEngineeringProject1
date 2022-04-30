import React, { useState, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  Background
} from 'react-flow-renderer';
import './Shapes.css';
import Sidebar from './Sidebar';
import './dnd.css';
import nodeTypes from './Nodes.jsx';
import axios from 'axios';

const initialElements = [
  
  { id: 'saveButton', type: 'save1', data: { }, position: { x: 0, y: 0 } },
  { id: 'loadButton', type: 'load1', data: { }, position: { x: 0, y: 35 } }
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const [data, setData] = React.useState(null);
  //asynch function, gets data from /api constantly
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);

  const onDragOver = (event) => {
    event.preventDefault();
    //alert("dragging");
    event.dataTransfer.dropEffect = 'move';
  };
  const dummy = (event) => {
    event.preventDefault();
    //alert("dragging");
  };

  const onClick = (event, ids) => {
    //save to express functionality, needs its own function at some point
    event.preventDefault();
    const reactData = {els: elements};
    const url = "/create";
  if(ids.type === "save1"){
    axios.post(url, reactData)
    .then(res => console.log('Data send'))
    .catch(err => console.log(err.data))
     //alert(data.id);
  }
  if(ids.type === "load1"){
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data));
    alert(data.nodes[0].type);
    //data.forEach(element => element.forEach(node => alert(node.id)));
    setElements((es) => data.nodes);
  }
  };

  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${type} node` },
    };

    setElements((es) => es.concat(newNode));
  };

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onElementClick={onClick}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            style ={{ width: '95%', height : '80vh' }}>
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;