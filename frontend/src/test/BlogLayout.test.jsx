import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import BlogLayout, { BlogIndex } from "../pages/BlogLayout";

describe("BlogIndex", () => {
  it("renders all article cards", () => {
    render(
      <MemoryRouter>
        <BlogIndex />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Reorder Point Formula/)).toBeInTheDocument();
    expect(screen.getByText(/Barcode Systems/)).toBeInTheDocument();
    expect(screen.getAllByText(/FIFO, LIFO/).length).toBeGreaterThan(0);
    expect(screen.getByText(/ABC Analysis in Inventory/)).toBeInTheDocument();
    expect(screen.getByText(/Inventory Turnover Ratio/)).toBeInTheDocument();
    expect(screen.getByText(/Stock Management for Small Businesses in India/)).toBeInTheDocument();
    expect(screen.getByText(/GST Inventory Management/)).toBeInTheDocument();
    expect(screen.getByText(/Warehouse Management for Small Businesses/)).toBeInTheDocument();
  });

  it("renders read more links", () => {
    render(
      <MemoryRouter>
        <BlogIndex />
      </MemoryRouter>,
    );
    const links = screen.getAllByText(/Read more/);
    expect(links).toHaveLength(8);
  });
});

describe("BlogLayout", () => {
  const renderAt = (path) =>
    render(
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/blog" element={<BlogLayout />}>
            <Route index element={<p>index</p>} />
            <Route path="post" element={<h1>Post title</h1>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

  it("uses the blog name as the h1 on the index", () => {
    renderAt("/blog");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("DoAide Inventory Blog");
  });

  it("leaves the only h1 to the post on article pages", () => {
    renderAt("/blog/post");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Post title");
  });
});
