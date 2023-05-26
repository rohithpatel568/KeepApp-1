import './App.css';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import AddKeep from './components/addkeep/AddKeep'
import DeletedKeep from './components/deletedkeeps/DeletedKeep'
import ShowKeep from './components/showkeeps/ShowKeep'
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <ShowKeep />
        },
        {
          path: "/add-keep",
          element: <AddKeep />
        },
        {
          path: "/deleted-keep",
          element: <DeletedKeep />
        }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
