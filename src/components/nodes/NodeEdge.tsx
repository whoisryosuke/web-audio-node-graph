import styled from "@emotion/styled";
import {
  BaseEdge,
  getBezierPath,
  getStraightPath,
  type BezierEdgeProps,
  type EdgeProps,
} from "@xyflow/react";

const StyledEdge = styled(BaseEdge)`
  transform: translateY(100px);
`;

export function NodeEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  pathOptions,
  ...props
}: BezierEdgeProps) {
  const [path, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature: pathOptions?.curvature,
  });

  return (
    <StyledEdge
      id={id}
      path={path}
      labelX={labelX}
      labelY={labelY}
      {...props}
    />
  );
}

export default NodeEdge;
