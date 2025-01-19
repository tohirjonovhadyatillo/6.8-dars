import React, { useState, useEffect } from "react";
import "./App.css";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    category: "",
  });
  const [filter, setFilter] = useState("");

  const addTask = () => {
    if (!newTask.name || !newTask.category) {
      alert("Hamma kataklarni to'ldiring!");
      return;
    }
    setTasks([...tasks, newTask]);
    setNewTask({ name: "", description: "", category: "" });
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const filteredTasks = filter
    ? tasks.filter(
        (task) => task.category.toLowerCase() === filter.toLowerCase()
      )
    : tasks;

  return (
    <div>
      <h1>To-Do Royxati</h1>
      <div>
        <input
          type="text"
          placeholder="Vazifa nomi"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Vazifa tavsifi"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Ish"
          value={newTask.category}
          onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div>
        <input
          type="text"
          placeholder="Filtr"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button onClick={() => setFilter("")}>Clear</button>
      </div>

      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index}>
            <strong>{task.name}</strong> - {task.description}{" "}
            <em>({task.category})</em>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>

      {filteredTasks.length === 0 && <p>Vazifalar mavjud emas</p>}
    </div>
  );
};

const UserProfileManagement = () => {
  const [profiles, setProfiles] = useState([]);
  const [activeOnly, setActiveOnly] = useState(false);
  const [newProfile, setNewProfile] = useState({
    name: "",
    surname: "",
    age: "",
    email: "",
    isActive: false,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("profiles", JSON.stringify(profiles));
  }, [profiles]);

  const addProfile = () => {
    if (
      !newProfile.name.trim() ||
      !newProfile.surname.trim() ||
      !newProfile.age.trim() ||
      !newProfile.email.trim()
    ) {
      setError("Iltimos barcha maydonlarni to'ldiring.");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(newProfile.email)) {
      setError("Noto'g'ri email format!");
      return;
    }

    setProfiles([...profiles, { ...newProfile, id: Date.now() }]);
    setNewProfile({
      name: "",
      surname: "",
      age: "",
      email: "",
      isActive: false,
    });
    setError("");
  };

  const deleteProfile = (id) => {
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  return (
    <div>
      <h1>User Profile Management</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newProfile.name}
          onChange={(e) =>
            setNewProfile({ ...newProfile, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Surname"
          value={newProfile.surname}
          onChange={(e) =>
            setNewProfile({ ...newProfile, surname: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Age"
          value={newProfile.age}
          onChange={(e) =>
            setNewProfile({ ...newProfile, age: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={newProfile.email}
          onChange={(e) =>
            setNewProfile({ ...newProfile, email: e.target.value })
          }
        />
        <label>
          <input
            type="checkbox"
            checked={newProfile.isActive}
            onChange={(e) =>
              setNewProfile({ ...newProfile, isActive: e.target.checked })
            }
          />
          Active
        </label>
        <button onClick={addProfile}>Add</button>
      </div>

      <button onClick={() => setActiveOnly(!activeOnly)}>
        {activeOnly ? "Hammasi" : "Aktivlar"}
      </button>

      <ul>
        {profiles
          .filter((profile) => (activeOnly ? profile.isActive : true))
          .map((profile) => (
            <li key={profile.id}>
              <span>
                {profile.name} {profile.surname} ({profile.age}) -{" "}
                {profile.email} - {profile.isActive ? "Active" : "Inactive"}
              </span>
              <button onClick={() => deleteProfile(profile.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

const ProductInventory = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Telefon",
      price: 200,
      quantity: 5,
      category: "Elektronika",
    },
    {
      id: 2,
      name: "Planshet",
      price: 500,
      quantity: 10,
      category: "Kiyim-kechak",
    },
  ]);

  const addProduct = () => {
    const newProduct = {
      id: Date.now(),
      name: "Noutbuk",
      price: 1000,
      quantity: 3,
      category: "Elektronika",
    };
    setProducts([...products, newProduct]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const filteredProducts = products.filter((product) => product.price > 100);

  useEffect(() => {
    document.title = `Mahsulotlar soni: ${products.length}`;
  }, [products]);

  return (
    <div>
      <h2>Mahsulotlar</h2>
      <button onClick={addProduct}>Add</button>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price} - {product.quantity} ta
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>100$ dan yuqori mahsulotlar</h3>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <ToDoList />
      <hr />
      <br />
      <UserProfileManagement />
      <hr />
      <br />
      <ProductInventory />
    </div>
  );
};

export default App;
