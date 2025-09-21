import "./App.css";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import BlogPage from "./pages/BlogPage";
import BlogPageGQL from "./pages/BlogPageGQL";
import ContactPage from "./pages/ContactPage";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
function App() {
  const apolloClient = new ApolloClient({
    uri: import.meta.env.VITE_GRAPHQL_URL,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all'
      },
      query: {
        errorPolicy: 'all'
      }
    }
  });

  console.log('GraphQL URL:', import.meta.env.VITE_GRAPHQL_URL);

  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <ResponsiveAppBar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog-gql" element={<BlogPageGQL />} />
          {/* <Route
            path="/admin"
            element={
              
                  <AdminPage />
                
            }
          /> */}

          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <ErrorBoundary>
                  <AdminPage />
                </ErrorBoundary>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
