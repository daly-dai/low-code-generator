import { groupBy, keys } from "lodash-es";

import inputComponents from './input-components';
import selectComponents from "./select-components";
import { ComponentsConfig, ComponentsTagType } from "../type";



function getComponentByTag(): Record<ComponentsTagType, ComponentsConfig> {
  const componentsList = [...inputComponents, ...selectComponents];

  const groupMap = groupBy(componentsList, "tag") as Record<ComponentsTagType, ComponentsConfig[]>;

  const result: Record<string, ComponentsConfig> = {};

  keys(groupMap).forEach((key) => {
    if (!groupMap[key as ComponentsTagType]?.length) return;

    result[key] = groupMap[key as ComponentsTagType][0];
  });

  return result
}

const componentsTagMap = getComponentByTag();


export default componentsTagMap