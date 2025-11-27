// chapter6_exercise_solutions.js
// Part III – Section 3: Styling at Scale
// Chapter 6 — Component Libraries
// Exercise Solutions: Themed Settings Form + Table in MUI and Chakra, plus Bootstrap markup.
// Each solution is a self-contained snippet set to demonstrate theming and customization.

const files = [
  // 1) Material UI (MUI) solution
  {
    filename: "mui/theme.tsx",
    language: "tsx",
    contents: `import * as React from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { deepmerge } from "@mui/utils";
import { blue, grey } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Palette {
    surface: string;
  }
  interface PaletteOptions {
    surface?: string;
  }
}

const base = createTheme({
  palette: {
    primary: { main: "#2563eb" },
    text: { primary: "#111827" },
    background: { default: "#ffffff", paper: "#ffffff" }
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    h1: { fontSize: "1.25rem", fontWeight: 700 },
    h2: { fontSize: "1.125rem", fontWeight: 600 }
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600 },
        containedPrimary: { color: "#ffffff" }
      },
      variants: [
        { props: { variant: "soft" as any }, style: { background: blue[50], color: blue[700] } }
      ]
    },
    MuiTextField: {
      defaultProps: { size: "small" }
    }
  }
});

export function AppTheme({ children, dark = false }: React.PropsWithChildren<{ dark?: boolean }>) {
  const theme = React.useMemo(() => deepmerge(base, dark ? {
    palette: {
      mode: "dark",
      text: { primary: "#e5e7eb" },
      background: { default: "#0f172a", paper: "#0b1220" }
    }
  } : {}), [dark]);
  return <ThemeProvider theme={theme}><CssBaseline />{children}</ThemeProvider>;
}`
  },
  {
    filename: "mui/Settings.tsx",
    language: "tsx",
    contents: `import * as React from "react";
import { Box, Button, Card, CardContent, CardHeader, FormControlLabel, Switch, TextField, Typography } from "@mui/material";

export default function Settings() {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [newsletter, setNewsletter] = React.useState(true);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Card sx={{ mb: 3 }}>
        <CardHeader title="Profile" />
        <CardContent>
          <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
            <TextField label="Full name" value={name} onChange={e => setName(e.target.value)} />
            <TextField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </Box>
          <Box sx={{ mt: 2 }}>
            <FormControlLabel control={<Switch checked={newsletter} onChange={e => setNewsletter(e.target.checked)} />} label="Subscribe to newsletter" />
          </Box>
          <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
            <Button variant="contained" color="primary">Save</Button>
            <Button variant="outlined">Cancel</Button>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Recent Activity" />
        <CardContent sx={{ p: 0 }}>
          <Box component="table" sx={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
            <Box component="thead" sx={{ "& th": { textAlign: "left", p: 2, color: "text.secondary" } }}>
              <Box component="tr">
                <Box component="th">Date</Box>
                <Box component="th">Action</Box>
                <Box component="th">Status</Box>
              </Box>
            </Box>
            <Box component="tbody" sx={{ "& td": { p: 2, borderTop: "1px solid", borderColor: "divider" } }}>
              <Box component="tr">
                <Box component="td">2025-10-01</Box>
                <Box component="td">Password changed</Box>
                <Box component="td"><Button variant="soft">OK</Button></Box>
              </Box>
              <Box component="tr">
                <Box component="td">2025-09-28</Box>
                <Box component="td">Email updated</Box>
                <Box component="td"><Button size="small" variant="outlined">View</Button></Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}`
  },

  // 2) Chakra UI solution
  {
    filename: "chakra/theme.tsx",
    language: "tsx",
    contents: `import * as React from "react";
import { ChakraProvider, extendTheme, defineStyleConfig } from "@chakra-ui/react";

const ButtonTheme = defineStyleConfig({
  baseStyle: { fontWeight: 600, borderRadius: "12px" },
  sizes: {
    sm: { px: 3, py: 1.5, fontSize: "sm" },
    md: { px: 4, py: 2 }
  },
  variants: {
    solid: { bg: "brand.600", color: "white", _hover: { opacity: .9 } },
    ghost: { color: "brand.600", bg: "transparent", border: "1px solid", borderColor: "currentColor" }
  },
  defaultProps: { size: "md", variant: "solid" }
});

const theme = extendTheme({
  colors: {
    brand: {
      50: "#eff6ff",
      600: "#2563eb"
    }
  },
  radii: { xl: "12px" },
  components: { Button: ButtonTheme },
  styles: {
    global: {
      "html, body": { bg: "surface", color: "text" }
    }
  }
});

export function AppTheme({ children }: React.PropsWithChildren) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}`
  },
  {
    filename: "chakra/Settings.tsx",
    language: "tsx",
    contents: `import * as React from "react";
import { Box, Button, Card, CardBody, CardHeader, Heading, Input, Switch, FormControl, FormLabel, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

export default function Settings() {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [newsletter, setNewsletter] = React.useState(true);

  return (
    <Box p={{ base: 4, md: 6 }}>
      <Card mb={4}>
        <CardHeader><Heading size="md">Profile</Heading></CardHeader>
        <CardBody>
          <Box display="grid" gap={4} gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}>
            <FormControl>
              <FormLabel>Full name</FormLabel>
              <Input value={name} onChange={e => setName(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </FormControl>
          </Box>
          <FormControl display="flex" alignItems="center" mt={4}>
            <FormLabel mb="0">Subscribe to newsletter</FormLabel>
            <Switch isChecked={newsletter} onChange={e => setNewsletter(e.target.checked)} />
          </FormControl>
          <Box mt={4} display="flex" gap={2}>
            <Button>Save</Button>
            <Button variant="ghost">Cancel</Button>
          </Box>
        </CardBody>
      </Card>

      <Card>
        <CardHeader><Heading size="md">Recent Activity</Heading></CardHeader>
        <CardBody>
          <Table>
            <Thead>
              <Tr>
                <Th>Date</Th><Th>Action</Th><Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr><Td>2025-10-01</Td><Td>Password changed</Td><Td><Button size="sm" variant="ghost">OK</Button></Td></Tr>
              <Tr><Td>2025-09-28</Td><Td>Email updated</Td><Td><Button size="sm" variant="outline">View</Button></Td></Tr>
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Box>
  );
}`
  },

  // 3) Bootstrap (markup + Sass variables)
  {
    filename: "bootstrap/index.html",
    language: "html",
    contents: `<!doctype html>
<html lang="en" data-bs-theme="light">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Bootstrap Settings</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  </head>
  <body class="bg-body">
    <main class="container py-4">
      <div class="card mb-4">
        <div class="card-header fw-semibold">Profile</div>
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Full name</label>
              <input class="form-control" />
            </div>
            <div class="col-md-6">
              <label class="form-label">Email</label>
              <input type="email" class="form-control" />
            </div>
          </div>
          <div class="form-check form-switch mt-3">
            <input class="form-check-input" type="checkbox" id="news" checked>
            <label class="form-check-label" for="news">Subscribe to newsletter</label>
          </div>
          <div class="mt-3 d-flex gap-2">
            <button class="btn btn-primary">Save</button>
            <button class="btn btn-outline-secondary">Cancel</button>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header fw-semibold">Recent Activity</div>
        <div class="card-body p-0">
          <table class="table mb-0">
            <thead><tr><th>Date</th><th>Action</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td>2025-10-01</td><td>Password changed</td><td><button class="btn btn-sm btn-outline-secondary">OK</button></td></tr>
              <tr><td>2025-09-28</td><td>Email updated</td><td><button class="btn btn-sm btn-outline-secondary">View</button></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  </body>
</html>`
  },
  {
    filename: "bootstrap/_custom.scss",
    language: "scss",
    contents: `// Customize Bootstrap via Sass before importing
$primary: #2563eb;
$border-radius: .75rem;
$btn-font-weight: 600;

@import "bootstrap/scss/bootstrap";`
  },

  // 4) Ant Design: ConfigProvider tokens example
  {
    filename: "antd/App.tsx",
    language: "tsx",
    contents: `import * as React from "react";
import { ConfigProvider, theme, Button, Card, Table, Switch, Input, Typography } from "antd";

const columns = [
  { title: "Date", dataIndex: "date" },
  { title: "Action", dataIndex: "action" },
  { title: "Status", dataIndex: "status", render: () => <Button type="default" size="small">OK</Button> }
];

const data = [
  { key: 1, date: "2025-10-01", action: "Password changed" },
  { key: 2, date: "2025-09-28", action: "Email updated" }
];

export default function App() {
  const [dark, setDark] = React.useState(false);

  return (
    <ConfigProvider
      theme={{
        algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#2563eb",
          borderRadius: 12,
          fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif"
        }
      }}
    >
      <div style={{ padding: 24 }}>
        <Card title="Profile" style={{ marginBottom: 16 }}>
          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
            <div>
              <Typography.Text>Full name</Typography.Text>
              <Input />
            </div>
            <div>
              <Typography.Text>Email</Typography.Text>
              <Input type="email" />
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <Switch checkedChildren="Dark" unCheckedChildren="Light" checked={dark} onChange={setDark} />
          </div>
          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <Button type="primary">Save</Button>
            <Button>Cancel</Button>
          </div>
        </Card>

        <Card title="Recent Activity">
          <Table columns={columns} dataSource={data} pagination={false} />
        </Card>
      </div>
    </ConfigProvider>
  );
}`
  }
];

// Utility to print files if run directly
if (typeof require !== 'undefined' && require.main === module) {
  files.forEach(f => {
    console.log("---- " + f.filename + " ----");
    console.log(f.contents);
    console.log();
  });
}

export default files;
