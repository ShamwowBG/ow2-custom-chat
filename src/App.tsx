import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type Ref,
} from "react";
import clsx from "clsx";
import ColorPicker, { useColorPicker } from "react-best-gradient-color-picker";
import { lerpHexColorRGBA } from "./utils";

const playerNames = [
  "0nMyB1kE",
  "C4LYPSO",
  "IHOLDW",
  "OmnicaBot",
  "Synaesthesia",
  "1ntiW4rrior",
  "Capt1v35un",
  "JetpackC47",
  "OVERCL0CKED",
  "TalonIsTops",
  "1RONCL4D",
  "CavalryHere",
  "Junk3r",
  "Paintb4ll3r",
  "TheArchitech",
  "1SHOT1KILL",
  "Ch00Ch00",
  "Junkenst31n",
  "PBLover",
  "TorbinTime",
  "2Spicy4U",
  "CHUN0",
  "JusticeR41N5",
  "PHR34KZ",
  "TS1fan",
  "4TH3N4",
  "Cvpids4rrow",
  "jvnkerqveen",
  "PLAY2WIN",
  "UselessPropaganda",
  "5him4d4",
  "D1V1NExARCHITECH",
  "K1NGH0WL",
  "PLSNANOME",
  "V4lkyr13",
  "12Hooks",
  "D34DL0CK",
  "K1tsune",
  "PLSREZME",
  "W1dowsK1ss",
  "ACC3L3RANDO",
  "DISCxRD",
  "Krusher99",
  "PushBot",
  "W1nt0n",
  "AlreadyTrac3r",
  "ECH0xL0C8R",
  "L1fePRTCTL1fe",
  "R4V4G3R",
  "Wayf1nder",
  "An00bis",
  "EfisBiggestFan",
  "Literally1",
  "RELEASEM3",
  "WH4MBUL4NCE",
  "ANDTHEYSAY",
  "EggHaus",
  "Luc10h0h",
  "RipEm2Pcs",
  "xRAPT0RA",
  "AntlerAntler",
  "EmreMain",
  "M0nd4tt4",
  "RIPGOATS",
  "xXNerfThisXx",
  "B0BD0SMTHN",
  "EZTarget",
  "M00nHamster",
  "Sh00tingSt4r",
  "XxP3RF3CTPRIS0NxX",
  "B4NSH33",
  "FACECLANK",
  "M1Tz1",
  "SHR1KE",
  "xXSwordMadamXx",
  "BASt3t",
  "Ganymede54",
  "M4D4xM4D4",
  "SillyGoose",
  "xY0K41x",
  "BBBrig",
  "GuardianAngel",
  "M4rti4n",
  "SimianScience",
  "YouKnowYourself",
  "BeansonsBeans",
  "GUNNY",
  "Mace2Face",
  "SPIN2WIN",
  "z0mn1c",
  "BEEFToad",
  "H0rus",
  "MEKAMANGO",
  "Str1keC0mmander",
  "AudioM3dic",
  "BioHazard",
  "H3L1X",
  "MightyMEKA",
  "Svyat0g0r",
];

type ClassName = {
  className?: string;
};

type ReactChildren = {
  children?: ReactNode;
};

type ChatMessageProps = ReactChildren & {
  codeMessage: string;
  icon?: ReactNode;
  username?: string;
  enableCopy?: boolean;
  iconColorStyle?: string;
  textColorStyle?: string;
};

type PickerColorNode = {
  left: number;
  value: string;
};

type ColorNode = {
  position: number;
  color: number;
};

function getUsername() {
  return playerNames[Math.floor(Math.random() * (playerNames.length - 1))];
}

const username = getUsername();

function App() {
  const [messages, setMessages] = useState<ChatMessageProps[]>([
    {
      codeMessage: "<FBff0000ff>Hello World!",
      children: <span>First write a message, then style and submit it!</span>,
      iconColorStyle: "bg-yellow-300",
      textColorStyle: "text-yellow-300",
      enableCopy: false,
    },
    {
      codeMessage:
        "<fgdc1f1fff>N<fgc5313ff4>o<fgae445fea> <fg97577fe0>f<fg80699fd5>a<fg697cbfcb>i<fg528fdfc1>r<fg3ca2ffb7>!",
      children: (
        <span className="text-[#ff0000]">
          Hello World! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Ea, perferendis.
        </span>
      ),
      username: getUsername(),
      enableCopy: true,
    },
    {
      codeMessage: "<FBff0000ff>Hello World!",
      children: (
        <span className="text-[#ff0000]">
          Hello World! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Ea, perferendis.
        </span>
      ),
      username: getUsername(),
      enableCopy: true,
    },
    {
      codeMessage: "<FBff0000ff>Hello World!",
      children: <span>{"Click on a message to copy it! This works on the preview as well."}</span>,
      iconColorStyle: "bg-yellow-300",
      textColorStyle: "text-yellow-300",
      enableCopy: false,
    },
  ]);
  const chatHistoryRef = useRef<HTMLDivElement>(null)!;

  const submitMessage = useCallback(
    (message: ChatMessageProps) => {
      setMessages((prev) => [...prev, message]);
    },
    [messages, setMessages],
  );

  useEffect(() => {
    chatHistoryRef.current?.scrollTo({
      top: chatHistoryRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <>
      <div className="min-h-dvh bg-red-300 text-lg/6">
        <section className="mx-auto flex w-fit">
          <div className="flex flex-col gap-2">
            <ChatHistory messages={messages} ref={chatHistoryRef} />
            <ChatInput onSubmit={submitMessage} />
          </div>
        </section>
      </div>
    </>
  );
}

type Reference<T> = {
  ref?: Ref<T>;
};

// one color code takes 13 characters

export default App;

function ChatContainer({
  className,
  children,
  ref,
}: ClassName & ReactChildren & Reference<HTMLDivElement>) {
  return (
    <div
      ref={ref}
      className={clsx(
        "min-h-3 max-w-[500px] rounded-sm bg-black/70 py-2",
        className,
      )}
    >
      {children}
    </div>
  );
}

function ChatMessage({
  username,
  children,
  className,
  codeMessage,
  icon,
  enableCopy = true,
  iconColorStyle = "bg-chat-message-teal",
  textColorStyle = "text-chat-message-teal",
}: ChatMessageProps & ClassName) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={clsx(
        "flex px-5 py-[5px]",
        textColorStyle,
        enableCopy && hovered && "bg-gray-300/10",
        className,
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        enableCopy && navigator.clipboard.writeText(codeMessage);
      }}
    >
      {icon || (
        <div
          className={clsx(
            "mt-[11px] mr-[14px] size-[6px] shrink-0 rounded-full drop-shadow-[0px_0.3px_0.5px_rgba(0,0,0,1)]",
            iconColorStyle,
          )}
        />
      )}
      <p className="max-w-full pr-6 text-pretty wrap-break-word">
        {username && <span key="username">{`[${username}]: `}</span>}
        {children}
      </p>
    </div>
  );
}

const ChatHistory = memo(
  ({
    messages,
    ref,
  }: { messages: ChatMessageProps[] } & Reference<HTMLDivElement>) => {
    return (
      <ChatContainer
        ref={ref}
        className="customScrollbar h-[300px] gap-2 overflow-x-clip overflow-y-scroll"
      >
        {messages.map(({ ...props }, i) => (
          <ChatMessage key={i} {...props} />
        ))}
      </ChatContainer>
    );
  },
);

type ChatInputProps = {
  onSubmit?: (message: ChatMessageProps) => void;
};

const ChatInput = memo(({ onSubmit }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [codeMessage, setCodeMessage] = useState("");
  const [previewMessage, setPreviewMessage] = useState<ReactNode>(<></>);
  const [color, setColor] = useState(
    "linear-gradient(90deg, rgba(96,93,93,1) 0%, rgba(255,255,255,1) 100%)",
  );
  const { getGradientObject } = useColorPicker(color, setColor);
  const colorNodes = useMemo((): ColorNode[] => {
    const gradients = getGradientObject(color)!;
    return (gradients.colors as PickerColorNode[]).map((e) => {
      const colorSubstring = e.value.substring(5, e.value.length - 1);
      const colorValues = colorSubstring.split(",");

      let color = "";
      colorValues.forEach((n, j) => {
        if (j === colorValues.length - 1) {
          const alpha = Math.floor(parseFloat(n) * 255).toString(16);
          color += alpha.length === 1 ? "0" + alpha : alpha;
          return;
        }
        const value = parseInt(n).toString(16);
        color += value.length === 1 ? "0" + value : value;
      });
      return { position: e.left, color: parseInt(color, 16) };
    });
  }, [color]);

  useEffect(() => {
    if (message === "") {
      setPreviewMessage([]);
      setCodeMessage("");
    } else {
      transformMessage();
    }
    // console.log(codeMessage);
    // console.log(previewMessage);
  }, [message, colorNodes]);

  const transformMessage = useCallback(() => {
    let code: string = "";
    const preview: ReactNode[] = [];

    const colorsLength = colorNodes.length;
    const messageLength = message.length;
    const lp = messageLength / 100;

    colorNodes.forEach(({ position, color }, i, arr) => {
      let start: number = 0;
      let end: number;
      let letterSegment: string;

      if (i === 0 && position > 0) {
        end = Math.floor(lp * position);
        letterSegment = message.substring(start, end);
        const { substringCode, substringNodes } = format(
          letterSegment,
          i,
          color,
        );
        code += substringCode;
        preview.push([...substringNodes]);
        return;
      } else if (i === 0) {
        return;
      }

      const { color: prevColor, position: prevPosition } = arr[i - 1];
      start = Math.floor(lp * prevPosition);
      end = Math.floor(lp * position);
      letterSegment = message.substring(start, end);

      if (color === prevColor) {
        const { substringCode, substringNodes } = format(
          letterSegment,
          i,
          color,
        );
        code += substringCode;
        preview.push([...substringNodes]);
      } else {
        const { substringCode, substringNodes } = format(
          letterSegment,
          i,
          prevColor,
          color,
        );
        code += substringCode;
        preview.push([...substringNodes]);
      }

      if (i === colorsLength - 1 && position < 100) {
        start = Math.floor(lp * position);
        letterSegment = message.substring(start);
        const { substringCode, substringNodes } = format(
          letterSegment,
          i,
          color,
        );
        code += substringCode;
        preview.push([...substringNodes]);
      }
    });

    setCodeMessage(code);
    setPreviewMessage(preview);
  }, [message, color]);

  const isMsgTooLong = useMemo(() => codeMessage.length > 200, [codeMessage]);

  console.log(colorNodes)

  return (
    <>
      <ChatContainer className="border-chat-message-teal relative border-l-[5px] pb-[7px]">
        <ChatMessage
          codeMessage=""
          username="Team"
          className="absolute pt-0 pb-0 pl-[15px]"
          enableCopy={false}
        />
        <textarea
          className="selection:bg-gray-20 field-sizing-content w-full resize-none px-5 pl-9 indent-[64px] text-white drop-shadow-[0px_0.3px_0.5px_rgba(0,0,0,1)] selection:bg-gray-200 selection:text-black placeholder:font-medium focus:outline-none"
          placeholder="WRITE YOUR LOVELY MESSAGE HERE"
          spellCheck={false}
          maxLength={200}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              e.preventDefault();
              if (onSubmit && isMessageEmpty(message)) {
                onSubmit({ codeMessage, children: previewMessage, username });
                setMessage("");
                setCodeMessage("");
                setPreviewMessage([]);
              }
            }
          }}
        />
      </ChatContainer>
      <ChatContainer className="h-fit">
        <ChatMessage codeMessage={codeMessage} username="Preview">
          {previewMessage}
        </ChatMessage>
      </ChatContainer>
      <p className={"text-right"}>
        {isMsgTooLong && (
          <p className="float-left inline-block">
            Message too long to fit in Overwatch
          </p>
        )}
        <span className={clsx(isMsgTooLong && "text-red-500")}>
          {codeMessage.length}
        </span>
        /200
      </p>
      {/* build color ramp and keep states in this component */}
      {/* build a ramp sample function */}
      {/* use ramp states + message to transform to code */}
      {/* send code to parent */}
      <div className="w-fit rounded-md bg-gray-800 p-2">
        <ColorPicker
          value={color}
          hidePresets
          hideGradientAngle
          hideGradientType
          hideColorTypeBtns
          onChange={setColor}
        />
      </div>
    </>
  );
});

function toHexString(n: number) {
  return n.toString(16);
}

function formatColor(col: string) {
  return `<fg${col}>`;
}

function isMessageEmpty(message: string) {
  const m = message;
  return m.replace(/\s/g, "") !== "";
}

function format(
  substring: string,
  key: number | string,
  color: number,
): { substringCode: string; substringNodes: ReactNode[] };
function format(
  substring: string,
  key: number | string,
  color: number,
  secondColor: number,
): { substringCode: string; substringNodes: ReactNode[] };
function format(
  substring: string,
  key: number | string,
  color: number,
  secondColor?: number,
): { substringCode: string; substringNodes: ReactNode[] } {
  let code: string = "";
  const preview: ReactNode[] = [];
  const colorHex = toHexString(color);

  if (secondColor) {
    for (let j = 0; j < substring.length; j++) {
      const letter = substring[j];

      if (letter === " ") {
        code += letter;
        preview.push(
          <span
            key={key.toString() + j.toString()}
          >
            {letter}
          </span>,
        );
        continue;
      }
      const lerpColor = toHexString(
        lerpHexColorRGBA(color, secondColor, j / (substring.length - 1 || 1)),
      );
      code += formatColor(lerpColor) + letter;
      console.log(letter, lerpColor);
      preview.push(
        <span
          key={key.toString() + j.toString()}
          style={{ color: `#${lerpColor}` }}
        >
          {letter}
        </span>,
      );
    }
  } else {
    code = formatColor(colorHex) + substring;
    console.log(substring, colorHex);
    preview.push(
      <span
        key={key.toString()}
        style={{ color: `#${colorHex}` }}
      >
        {substring}
      </span>,
    );
  }

  return { substringCode: code, substringNodes: preview };
}

