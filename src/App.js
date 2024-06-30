import { useState, useEffect } from "react";
import "./App.css";

const questions = [
    {
        id: 1,
    },
    {
        id: 2,
    },
    {
        id: 3,
    },
];
function App() {
    const [firstChoice, setfirstChoice] = useState(false);
    const [finalChoice, setfinalChoice] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [bigPrizeId, setBigPrizeId] = useState(null);

    return (
        <div>
            <Board
                firstChoice={firstChoice}
                finalChoice={finalChoice}
                bigPrizeId={bigPrizeId}
                selectedId={selectedId}
            />
            <FlashCards
                firstChoice={firstChoice}
                finalChoice={finalChoice}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                bigPrizeId={bigPrizeId}
                setBigPrizeId={setBigPrizeId}
            />
            <ControllerButton
                firstChoice={firstChoice}
                finalChoice={finalChoice}
                setfinalChoice={setfinalChoice}
                setfirstChoice={setfirstChoice}
            />
            <Footer />
        </div>
    );
}
function Board({ firstChoice, finalChoice, bigPrizeId, selectedId }) {
    if (finalChoice && bigPrizeId === selectedId)
        return (
            <div className="centered_button">
                <div className="notice">
                    <p>
                        恭喜你！获得了价值五学分的微积分课程！（音乐）（浏览器刷新可重新闯关）
                        <b>你过关！</b>
                    </p>
                </div>
            </div>
        );
    else if (!firstChoice)
        return (
            <div className="centered_button">
                <div className="notice">
                    <p>
                        <b>闯关学生注意，本关考验你：</b>
                        三门问题。三扇门后各有奖励，其一为价值五学分的主课，其余为某一分课程。选择一扇门，按下首次选择按钮后，系统将随机打开未被选中的门中包含一分课的一扇。你可以此时换门，也可以不换。可以记录你的策略，多次游戏，检验概率。选到五分大奖方可过关，
                        <b>你明白吗？</b>
                    </p>
                </div>
            </div>
        );
    else if (!finalChoice)
        return (
            <div className="centered_button">
                <div className="notice">
                    <p>
                        为你排除了一个错误选项。你可以换门，也可以坚持你的选择。注意计算谁的胜率大。
                    </p>
                </div>
            </div>
        );
    else
        return (
            <div className="centered_button">
                <div className="notice">
                    <p>
                        没选中，<b>该罚！</b>按浏览器刷新键方可重新闯关。
                    </p>
                </div>
            </div>
        );
}

function FlashCards({
    firstChoice,
    finalChoice,
    selectedId,
    bigPrizeId,
    setBigPrizeId,
    setSelectedId,
}) {
    const [openId, setOpenId] = useState(null);
    useEffect(() => {
        // Randomly pick an ID from 1, 2, 3
        const randomId = Math.floor(Math.random() * 3) + 1; // Generates 1, 2, or 3
        setBigPrizeId(randomId);
        const randomOpen = ((randomId + 1) % 3) + 1;
        setOpenId(randomOpen);
    }, []);

    function handleClick(id, firstChoice, finalChoice, openId, bigPrizeId) {
        var initial_open = openId;
        if (!firstChoice) {
            setSelectedId(id !== selectedId ? id : null);
            while (initial_open === bigPrizeId || initial_open === id) {
                initial_open = ((initial_open + 1) % 3) + 1;
            }
            setOpenId(initial_open);
        }
        if (firstChoice && !finalChoice && id !== openId) setSelectedId(id);
    }

    return (
        <div className="flashcards-container">
            <div className="flashcards">
                {questions.map((question) => (
                    <div
                        key={question.id}
                        onClick={() =>
                            handleClick(
                                question.id,
                                firstChoice,
                                finalChoice,
                                openId,
                                bigPrizeId
                            )
                        }
                        className={
                            !firstChoice
                                ? question.id === selectedId
                                    ? "selected"
                                    : "notSelected"
                                : !finalChoice
                                ? question.id === openId
                                    ? "openNormalPrize"
                                    : question.id === selectedId
                                    ? "selected"
                                    : "notSelected"
                                : question.id === openId
                                ? "openNormalPrize"
                                : question.id === selectedId
                                ? question.id === bigPrizeId
                                    ? "bigPrize"
                                    : "normalPrize"
                                : question.id === bigPrizeId
                                ? "openBigPrize"
                                : "openNormalPrize"
                        }>
                        <p
                            style={{
                                position: "relative",
                                top: "25%",
                                left: "0",
                                right: "0",
                                textAlign: "center", // Center the text if needed
                            }}>
                            {!firstChoice
                                ? ""
                                : !finalChoice
                                ? question.id === openId
                                    ? "科技人文研讨课"
                                    : ""
                                : question.id === openId
                                ? "科技人文研讨课"
                                : question.id === selectedId
                                ? question.id === bigPrizeId
                                    ? "微积分A(1)"
                                    : "科技人文研讨课"
                                : question.id === bigPrizeId
                                ? "微积分A(1)"
                                : "科技人文研讨课"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ControllerButton({
    firstChoice,
    finalChoice,
    setfirstChoice,
    setfinalChoice,
}) {
    function ControlProgress(firstChoice) {
        firstChoice ? setfinalChoice(true) : setfirstChoice(true);
    }
    return finalChoice ? (
        <div />
    ) : (
        <div className="centered_button">
            <button
                class="btn"
                onClick={() => ControlProgress(firstChoice, finalChoice)}>
                {firstChoice ? "最终选择" : "首次选择"}
            </button>
        </div>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <p>
                ___________________________________________________________________________________________
            </p>
            <p>
                <b>If you've got good ideas about this, Email me@:</b>{" "}
                liuyifan22@mails.tsinghua.edu.cn
            </p>
            <p>
                思路：{" "}
                <a
                    href="https://mp.weixin.qq.com/s?__biz=MzI5MzY0MjU0OQ==&mid=2247483654&idx=1&sn=7a77ee6ae2492cfe74ccf5587b2f05d0&chksm=ec6e495cdb19c04a77c42b60e35f3b105b060b5160f4fbbad07a09c5197d0f3c7bd71e2a9334&scene=21#wechat_redirec"
                    target="blank">
                    中小学百科知识-公众号
                </a>
            </p>
            <p>Skills from Jonas Ultimate React.</p>
        </footer>
    );
}

export default App;
