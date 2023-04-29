import React, { useState } from 'react';
import { TreeView, TreeItem } from '@mui/lab';
import { TextField } from '@mui/material';
import { css } from '@emotion/react';

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

const initialTreeData: TreeNode[] = [
  {
    id: 'root',
    label: 'Root',
    children: [
      {
        id: 'node1',
        label: 'Node 1',
      },
      {
        id: 'node2',
        label: 'Node 2',
        children: [
          {
            id: 'node2-1',
            label: 'Node 2.1',
          },
          {
            id: 'node2-2',
            label: 'Node 2.2',
          },
        ],
      },
    ],
  },
];


const JsonEditor = () => {
  // state to store the JSON data
  const [treeData, setTreeData] = useState<TreeNode[]>(initialTreeData);

  // event handler to update the label of a tree node
  const handleUpdate = (id: string, label: string) => {
    const updateNode = (node: TreeNode): TreeNode => {
      if (node.id === id) {
        return {
          ...node,
          label,
        };
      } else if (node.children) {
        return {
          ...node,
          children: node.children.map((child) => updateNode(child)),
        };
      } else {
        return node;
      }
    };

    setTreeData((prevData) => prevData.map((node) => updateNode(node)));
  };

  // render the JSON data as an editable tree
  const renderTree = (nodes: TreeNode[]) => {
    return (
      <TreeView
        defaultCollapseIcon={<></>}
        defaultExpandIcon={<></>}
        defaultEndIcon={<></>}
      >
        {nodes.map((node) => (
          <TreeItem
            key={node.id}
            nodeId={node.id}
            label={
              <TextField
                value={node.label}
                onChange={(e) => handleUpdate(node.id, e.target.value)}
              />
            }
          >
            {node.children && renderTree(node.children)}
          </TreeItem>
        ))}
      </TreeView>
    );
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
      `}
    >
      {renderTree(treeData)}
    </div>
  );
};


const Test = () => {
  return (
    <div>
      <h1>Editable JSON Tree</h1>
      <JsonEditor />
    </div>
  );
};

export default Test;