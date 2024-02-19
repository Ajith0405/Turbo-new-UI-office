import React, { useEffect, useState } from "react";
import { Board } from "../../Types/types";
import axios from "axios";
import { Link } from "react-router-dom";
import AllBoardNavbar from "./AllBoardNabar";

import './allBoard.css';

const AllBoards = () => {
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5050/getAllBoards")
      .then((res) => {
        // console.log(res.data)
        setBoards(res.data);
      })
      .catch((err) => {
        console.log("testing", err.message);
      });
  }, [boards]);
  return (
    <div>
      <AllBoardNavbar />
      {boards && (
        <div className="row ms-2 "  style={{ marginTop: "80px" }}>
          {boards
            .slice()
            .reverse()
            .map((board, index) => (
              <div key={index} className="col-6 col-sm-4 col-md-4 col-lg-2 d-flex justify-content-center align-items-center g-1">
                <Link to={`/board/${board.id}`} style={{ textDecoration: 'none' }}>
                  
                    {/* <p  className='my-auto' style={{fontWeight:'600'}}>{board.board_name}</p>  */}
                    <div className="card card_board">
                      <div className="card-body">
                        <p className="card-title text-center my-auto">{board.board_name}</p>
                      </div>
                    </div>
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default AllBoards;
