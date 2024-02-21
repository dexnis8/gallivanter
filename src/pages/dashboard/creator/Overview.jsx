/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Filter from "../../../components/icons/Filter";
import SearchIcon from "../../../components/icons/SearchIcon";
import {
  Chip,
  FormControl,
  ListItem,
  Menu,
  MenuItem,
  Select,
} from "@mui/material";
import DataTable from "react-data-table-component";
import DeleteBtn from "../../../components/icons/DeleteBtn";
import { Box, Paper } from "@mui/material";
// import png from "../../../assets/pngkey.jpg";
import { AngleDown } from "../../../components/icons/AngleDown";
import { formatString } from "../../../utils/Formats";
import { EditBtn } from "../../../components/icons/EditBtn";
// import ConfirmActionModal from "../../../components/modals/ConfirmActionModal";
import { toast } from "react-toastify";
import Eyes from "../../../components/icons/Eyes";
import { useGetTourRegMembersQuery } from "../../../redux/api/Services";
import { useNavigate } from "react-router-dom";

const SearchFilter = ({ search, setSearch }) => {
  const [sort, setSort] = useState("Action");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [displayedFilters, setDisplayedFilters] = useState([]);
  const [filters, setFilters] = useState([
    { id: 1, name: "Active" },
    { id: 2, name: "Recently updated" },
    { id: 3, name: "Category" },
    { id: 4, name: "Recently added" },
    // Add more items as needed ro fetch from backend
  ]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  // Selections functions
  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelectedItems) => {
      const isSelected = prevSelectedItems.includes(id);

      if (isSelected) {
        // Item is already selected, remove it
        return [...prevSelectedItems.filter((id) => id !== id)];
      } else {
        // Item is not selected, add it to the selected items
        return [...prevSelectedItems, id];
      }
    });
  };

  let allFilters = ["Active", "Recently Updated", "Category", "Recently added"];
  const applyFilter = () => {
    setDisplayedFilters([
      ...selectedItems.map((index) => allFilters[index - 1]),
    ]);
    handleClose();
  };

  const handleRemoveItem = (itemId) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.filter((item) => item !== itemId)
    );
    applyFilter();
  };
  const clearAllFilters = () => {
    setSelectedItems([]);
    setDisplayedFilters([]);
  };

  return (
    <>
      <div className=" flex flex-col  md:justify-between my-10 gap-5 md:flex-row ">
        <div className=" flex flex-wrap gap-2 mb-2 relative md:flex-row lg:flex-row lg:gap-2 ">
          <div className="flex gap-2 ">
            <div>
              <button
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                //uncomment to active filter sorting
                // onClick={handleClick}
                className="flex items-center text-black-1200 text-sm leading-6 gap-1 border  border-slate-600 rounded-md w-24 align-middle justify-center bg-white h-12"
              >
                <Filter size={16} />
                <p className="test-sm"> Filter by</p>
              </button>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <div className=" px-5 py-">
                  <h4 className="my-2 text-base font-semibold text-black-900">
                    Select Filters
                  </h4>
                  <hr />

                  <div className="grid grid-cols-2 mt-5 gap-y-5 gap-x-1 sm:gap-x-8">
                    {filters.map((filter, idx) => (
                      <span
                        key={idx}
                        className="flex items-center gap-3 text-sm sm:text-base"
                      >
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(filter.id)}
                          onChange={() => handleCheckboxChange(filter.id)}
                          className="h-[16px] w-[16px] "
                        />
                        <p>{filter.name}</p>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-8 justify-end">
                    <button
                      onClick={handleClose}
                      className=" py-2 px-6 text-sm rounded-lg hover:bg-red-100 border hover:text-white transition-opacity text-red-100 border-red-100  "
                    >
                      Cancel
                    </button>
                    <button
                      onClick={applyFilter}
                      className=" py-2 px-6 text-sm rounded-lg hover:opacity-75 transition-opacity text-white bg-purple-700"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </Menu>
            </div>
            <div className="relative">
              <button className="absolute flex mt-4 justify-center h-full ml-2">
                <SearchIcon />
              </button>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by tour name"
                className="h-12  px-3 lg:w-[250px]  leading-6 text-black-1200 placeholder-black-1200  border-slate-600 text-sm bg-transparent border rounded-md pl-8"
              />
            </div>
          </div>

          {/* Action */}
          {/* <div>
            <FormControl sx={{ m: 0, minWidth: 80 }} size="small">
              <Select
                className="text-sm"
                style={{
                  borderRadius: "8px",
                  fontSize: "14px",
                  color: "#181616",
                  borderColor: "#7E7772",
                  padding: "6px 16px",
                }}
                value={sort}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="Action">Actions</MenuItem>
                <MenuItem value="Delete">Delete</MenuItem>
              </Select>
            </FormControl>
          </div> */}
        </div>
      </div>
      {/* Filter component */}
      <div
        className={` items-center mb-6 ${
          displayedFilters.length > 0 ? "flex" : "hidden"
        } `}
      >
        <h4>Applied Filters:</h4>
        <ul className="flex items-center gap-[-20px] justify-start ">
          {displayedFilters.length > 0 &&
            displayedFilters?.map((data, idx) => {
              return (
                <ListItem key={idx}>
                  <Chip
                    // icon={icon}
                    // deleteIcon={<CloseModalIcon width={14} height={14} />}
                    label={data}
                    onDelete={() => handleRemoveItem(idx + 1)}
                    sx={{
                      bgcolor: "#fff",
                      p: 2,
                      borderRadius: 2,
                      fontSize: "14px",
                    }}
                  />
                </ListItem>
              );
            })}
        </ul>
        <h4
          onClick={clearAllFilters}
          className="ml-3 cursor-pointer hover:underline text-red-100"
        >
          Clear Filters{" "}
        </h4>
      </div>
    </>
  );
};

const Overview = () => {
  const navigate = useNavigate();
  const customStyles = {
    table: {
      style: {
        width: "auto",
        gap: "8px",
        backgroundColor: "#F9FAFB",
      },
    },
    rows: {
      style: {
        paddingTop: "8px",
        paddingBottom: "8px",
        paddingLeft: "0px",
        paddingRight: "0px",
        margin: "0",
        width: "100%",
        marginTop: "1px",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#FEF1EE",
        boderRadius: "20px",
        padding: "8px 20px",
        fontSize: "15px",
        color: "#181616",
        lineHeight: "21px",
        fontWeight: "600",
      },
    },
    cells: {
      style: {
        paddingLeft: "0px", // override the cell padding for data cells
        paddingRight: "8px",
        marginLeft: "0px",
        width: "100px",
      },
    },
  };

  const [search, setSearch] = useState("");
  const [filterProduct, setFilterProducts] = useState([]);

  //Queries
  const { data: mockData, isLoading, error } = useGetTourRegMembersQuery();

  useEffect(() => {
    // if (mockData?.status === "success") {
    //   toast.success(mockData?.message);
    // }
    if (mockData?.status === "error") {
      toast.error(mockData?.message);
    }
  }, [mockData, error]);
  console.log(mockData);
  console.log(error);

  const columns = [
    {
      name: "First name",
      cell: (row) => (
        <p className="text-sm ml-5 font-normal text-left text-black-1200 whitespace-nowrap">
          {formatString(row?.firstName, 15)}
        </p>
      ),
      grow: 1.5,
    },
    {
      name: "Last name",
      cell: (row) => (
        <p className="text-sm ml-[10px] font-normal text-left text-black-1200 whitespace-nowrap">
          {formatString(row?.lastName, 20)}
        </p>
      ),
      grow: 1.2,
    },
    {
      name: "Email",
      cell: (row) => (
        <p className="text-sm ml-3 font-normal text-left text-black-1200 whitespace-nowrap">
          {row?.email}
        </p>
      ),
    },
    {
      name: "Tour joined",
      cell: (row) => (
        <p className="text-sm ml-5 font-normal text-left text-black-1200 whitespace-nowrap">
          {row?.tourTitle}
        </p>
      ),
    },
    // {
    //   name: "Used",
    //   cell: (row) => (
    //     <p className="text-sm ml-5 font-normal text-left text-black-1200 whitespace-nowrap">
    //       {row?.used}
    //     </p>
    //   ),
    // },
  ];

  // UseEffects

  useEffect(() => {
    // replace mockData with actual response from endpoint
    if (search !== "") {
      const result = mockData?.regMembers?.filter((product) => {
        return product.tourTitle.toLowerCase().match(search.toLowerCase());
      });
      setFilterProducts([...result]);
    }

    if (mockData && search === "") {
      setFilterProducts([...mockData.regMembers]);
    }
  }, [search, mockData]);

  // eslint-disable-next-line react/display-name, react/prop-types
  const Checkbox = React.forwardRef(({ onClick, ...rest }, ref) => {
    return (
      <>
        <div className="ml-6">
          <input
            type="checkbox"
            className="form-check-input w-[20px] mt-1 p-3 h-[20px] "
            ref={ref}
            onClick={onClick}
            {...rest}
          />
          <label className="form-check-label" id="booty-check" />
        </div>
      </>
    );
  });

  const sortIcon = <AngleDown color={"#2A2726"} />;
  return (
    <>
      <div>
        <SearchFilter setSearch={setSearch} search={search} />
        <Box>
          <Paper>
            <DataTable
              columns={columns}
              data={filterProduct}
              customStyles={customStyles}
              selectableRows
              selectableRowsComponent={Checkbox} // Pass the Checkbox component only
              selectableRowsHighlight
              highlightOnHover
              pointerOnHover
              responsive
              sortIcon={sortIcon}
              pagination
              noDataComponent={
                <div className="text-center col-span-3 py-5">
                  {" "}
                  <p className="text-base text-gray-500 font-semibold">
                    No user has joined your tour.
                  </p>
                  <button
                    onClick={() => navigate("/dashboard/create-tour")}
                    className="py-3 my-5 hover:bg-primary-800 transition-all duration-300 px-10 text-sm font-bold bg-orange-500 rounded-full text-white"
                  >
                    Create Tour
                  </button>
                </div>
              }
            />
          </Paper>
        </Box>
      </div>
    </>
  );
};

export default Overview;
