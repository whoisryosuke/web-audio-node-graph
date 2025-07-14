![Screenshot of project running in web browser. An oscillator node is connected to a gain node, which is connected to an analyser node, and the output ultimately. Another oscillator node is also connected to the gain node's gain parameter.](/docs/screenshot.png)

# Web Audio Node Graph

A node graph for testing web audio. Each node represents a web audio node, like the `OscillatorNode` or `AnalyserNode`.

## Development

1. `yarn`
1. `yarn dev`

### Requirements

- NodeJS (v22+)

### Creating nodes

1. Create a new component for the node UI in [the /nodes/ folder](src\nodes).
1. Add the component to [index.ts](src\nodes\index.ts). This adds it to the dropdown list in app.
1. Add a `case` to the `switch` statement in [/nodes/utils.ts](src\nodes\utils.ts) for the new node and it's default props.
1. Add a `case` to the `switch` statement in [/services/audio/audio-graph.ts](src\services\audio\audio-graph.ts) in the `createAudioNode()` function. This is where you'd actually create the web audio node and add it to the `audioNodes` global `Map` cache.

Your node should work!

### Node UI

Nodes follow a specific structure:

```tsx
const CustomNode = ({ id, data }: Props) => {
  // data = the node data. could be anything you need to save/show.
  // id = random ID. good for associating node to web audio node.
  return (
    <NodeContainer>
      <NodeHeading color="purple">Custom Node</NodeHeading>
      <NodeInput />
      <NodeOutput />
      <NodeContent>{/* Your content here - like inputs */}</NodeContent>
    </NodeContainer>
  );
};

export default CustomNode;
```

**The components:**

- `<NodeContainer>` - Wrap your entire node in this component. It's what provides the "card" like styling.
- `<NodeHeading>` - The colored node header with the node's name. Supports all the Chakra UI color variants.
- `<NodeInput>` - This provides the input connection. This represents the web audio node connection (e.g. you would connect an oscillator's output to a gain node's input). Notice that some nodes don't need this, like oscillator - only it's parameters allow for connection.
- `<NodeOutput>` - This provides the output connection. Similar to above, this is the output of the web audio node. Most nodes will need this.
- `<NodeContent>` - Place all content in here. It's not necessary, but provides base-line layout like padding.
- `<NodeHandle>` - Used for creating additional connections (like for node parameters).

### Node Input

When I refer to "node input", I'm talking about components that change the `data` prop of the specific node. You can define this data structure as a `type` above the component.

```tsx
export type GainData = {
  gain: number;
};

type Props = {
  id: string;
  data: GainData;
};
```

Import and use the `<NodeInputField>` component to wrap your input element/component. Ideally this is inside a `<NodeContainer>` and it's `<NodeContent>` component.

```tsx
<NodeContainer>
  <NodeContent>
    <NodeInputField label="Gain" helper={`${data.gain}`}></NodeInputField>
  </NodeContent>
</NodeContainer>
```

Add your input element/component - like say, a `<Slider>` for controlling a number range. Your `value` for your `<input>` will come from the `data` props. So for the gain node, we want to use `data.gain`:

```tsx
<Slider
  className="nodrag"
  min={0}
  max={1}
  step={0.01}
  defaultValue={[data.gain]}
  value={[data.gain]}
  onValueChange={setGain}
/>
```

> We use Chakra UI, but they use a lot of composition for complex components, so you'll find a few wrappers in `/components/ui`. Otherwise just import directly from Chakra UI's React package.

To update the node with new data, we access the node store using the `useNodeStore()` hook and use it's `updateNode()` function. This takes a node ID (which we get from the component props), and the new data we want to update it with. In this case, we'll update the `data.gain` property with the new value from our slider. We also provide the node's data `type`, so the `updateNode()` function knows the shape of data we're updating.

```tsx
const { updateNode } = useNodeStore();

const setGain = (e: { value: number[] }) =>
  updateNode<GainData>(id, { gain: +e.value });
```

And that's it! Your node should update it's data with the UI - and ideally the underlying web audio API as well.

> The [gain node](src\nodes\Gain.tsx) is a great example of how to handle input. You can also see how handle connections to audio node parameters.

## How it works

Based on [the Reactflow Web Audio tutorial](https://reactflow.dev/learn/tutorials/react-flow-and-the-web-audio-api). If you're interested in a walkthrough of the fundamental architecture, I'd recommend reading that. We don't deviate too immensely (yet), and they implement a lot of optimizations that we don't (and should).
