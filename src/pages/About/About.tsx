import * as d3 from "d3";
import React, { useEffect, useRef } from "react";

interface HierarchyData {
  name: string;
  children?: HierarchyData[];
  link?: string;
}

const ApplicationStructure = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const data: HierarchyData = {
      name: "Application",
      children: [
        {
          name: "Frontend",
          children: [
            { name: "TypeScript" },
            { name: "React" },
            { name: "Chakra UI" },
            {
              name: "CI/CD",
              children: [
                {
                  name: "Deploys to Vercel",
                  link: "https://convergent-nine.vercel.app/",
                },
              ],
            },
          ],
        },
        {
          name: "Backend",
          children: [
            { name: "Swagger" },
            { name: "MongoDB" },
            { name: "Express" },
            {
              name: "CI/CD",
              children: [
                {
                  name: "Deploys to Render",
                  link: "https://convergent.onrender.com/api-docs/",
                },
              ],
            },
          ],
        },
      ],
    };

    const width = 1600;
    const height = 600;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const root = d3.hierarchy(data);
    const treeLayout = d3
      .tree<HierarchyData>()
      .size([width - 200, height - 200]);
    const treeData = treeLayout(root);

    const links = treeData.links();
    const nodes = treeData.descendants();

    // Add gradient for links
    const defs = svg.append("defs");
    const gradient = defs
      .append("linearGradient")
      .attr("id", "linkGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#6a11cb");
    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#2575fc");

    // Add links
    svg
      .selectAll("path.link")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr(
        "d",
        d3
          .linkHorizontal<
            d3.HierarchyPointLink<HierarchyData>,
            d3.HierarchyPointNode<HierarchyData>
          >()
          .x((d) => d.x + 100) // Correctly accessing `x` property from `HierarchyPointNode`
          .y((d) => d.y + 100) // Correctly accessing `y` property from `HierarchyPointNode`
      )
      .attr("stroke", "url(#linkGradient)")
      .attr("stroke-width", 2)
      .attr("fill", "none");

    // Add nodes
    const nodeGroup = svg
      .selectAll("g.node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x + 100},${d.y + 100})`);

    nodeGroup
      .append("circle")
      .attr("r", 20)
      .attr("fill", (d) => (d.data.link ? "#34D399" : "#3B82F6"))
      .attr("stroke", "#1E293B")
      .attr("stroke-width", 2)
      .style("filter", "drop-shadow(2px 4px 6px rgba(0,0,0,0.2))")
      .on("mouseover", function (event, d) {
        d3.select(this).attr("fill", "#E11D48");
      })
      .on("mouseout", function (event, d) {
        d3.select(this).attr("fill", d.data.link ? "#34D399" : "#3B82F6");
      })
      .on("click", (event, d) => {
        if (d.data.link) window.open(d.data.link, "_blank");
      });

    // Add labels
    nodeGroup
      .append("text")
      .text((d) => d.data.name)
      .attr("y", 35)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "#1F2937");
  }, []);

  return <svg ref={svgRef}></svg>;
};

const fileStructure: HierarchyData = {
  name: "server",
  children: [
    {
      name: "api",
      children: [
        {
          name: "controllers",
          children: [
            { name: "attendeeController.js" },
            { name: "eventController.js" },
            { name: "userController.js" },
          ],
        },
        {
          name: "models",
          children: [{ name: "eventModel.js" }, { name: "userModel.js" }],
        },
        {
          name: "routes",
          children: [
            { name: "attendees.js" },
            { name: "events.js" },
            { name: "example.js" },
            { name: "users.js" },
          ],
        },
        {
          name: "services",
          children: [
            { name: "attendeeService.js" },
            { name: "eventService.js" },
          ],
        },
        { name: "utils" },
        { name: "index.js" },
      ],
    },
  ],
};

const FileStructureTree: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const width = 1600;
    const height = 600;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Create hierarchy
    const root = d3.hierarchy<HierarchyData>(fileStructure);

    // Create tree layout
    const treeLayout = d3.tree<HierarchyData>().size([width - 75, height - 75]);
    treeLayout(root);

    const links = root.links();
    const nodes = root.descendants();

    // Add gradient for links
    const defs = svg.append("defs");
    const gradient = defs
      .append("linearGradient")
      .attr("id", "linkGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#6a11cb");
    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#2575fc");

    // Add links
    svg
      .selectAll("path.link")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr(
        "d",
        // @ts-ignore
        d3
          .linkHorizontal<{ x: number; y: number }, { x: number; y: number }>()
          .x((d) => d.x)
          .y((d) => d.y)
      )
      .attr("stroke", "url(#linkGradient)")
      .attr("stroke-width", 2)
      .attr("fill", "none");

    // Add nodes
    const nodeGroup = svg
      .selectAll("g.node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);

    nodeGroup
      .append("circle")
      .attr("r", 20)
      .attr("fill", (d) => (d.children ? "#3B82F6" : "#34D399")) // Blue for folders, green for files
      .attr("stroke", "#1E293B")
      .attr("stroke-width", 2)
      .style("filter", "drop-shadow(2px 4px 6px rgba(0,0,0,0.2))");

    // Add labels
    nodeGroup
      .append("text")
      .text((d) => d.data.name)
      .attr("y", 35)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "#1F2937");

    // Add hover effect
    nodeGroup
      .on("mouseover", function () {
        d3.select(this).select("circle").attr("fill", "#E11D48"); // Highlight on hover
      })
      .on("mouseout", function (event, d) {
        d3.select(this)
          .select("circle")
          .attr("fill", d.children ? "#3B82F6" : "#34D399"); // Reset color
      });
  }, []);

  return <svg ref={svgRef}></svg>;
};

const About = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>Architecture Overview</h2>
        <ApplicationStructure />
        <h2>Backend Architecture</h2>
        <FileStructureTree />
      </div>
    </>
  );
};

export default About;

// export default ApplicationStructure;
