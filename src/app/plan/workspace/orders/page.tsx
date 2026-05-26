"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Modal } from "@/components/Modal/Modal/Modal";
import { OrderUpload } from "@/components/Modal/OrderUpload/OrderUpload";

import { OrderFileHeader } from "@/components/Modal/OrderUpload/OrderUpload.types";

import { TextInput } from "@/components/form/TextInput/TextInput";
import TimeInput from "@/components/form/TimeInput/TimeInput";
import { LocationInput } from "@/components/form/LocationInput/LocationInput";
import { SkillInput } from "@/components/form/SkillInput/SkillInput";

import { Order } from "@/types/api.types";

import styles from "./page.module.scss";
import { SelectInput } from "@/components/form/SelectInput/SelectInput";

const mockOrders: Order[] = [
  {
    id: 1,
    name: "Order A",
    description: "Frozen food",
    capacity: 10,
    skills: {
      id: 1,
      name: "ห้องเย็น",
      color: "#4ADE80",
    },

    timeWindow: {
      start: 800,
      end: 1200,
    },

    location: {
      lat: 16.1479,
      lng: 102.1578,
    },

    serviceTime: 15,

    type: "delivery",

    priority: "high",
  },
];

const toTimeValue = (hhmm: number) => {
  const str = hhmm.toString().padStart(4, "0");

  return {
    hours: str.slice(0, 2),
    minutes: str.slice(2, 4),
  };
};

const toNumberTime = ({
  hours,
  minutes,
}: {
  hours: string;
  minutes: string;
}) => {
  return Number(`${hours.padStart(2, "0")}${minutes.padStart(2, "0")}`);
};

const Orders = () => {
  const DEFAULT_HEADER_INDEX = -1;

  const [isUpload, setIsUpload] = useState(false);

  const [orderData, setOrderData] =
    useState<Order[]>(mockOrders);

  const [orderFileHeader, setOrderFileHeader] =
    useState<OrderFileHeader>({
      name: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "ชื่องาน",
        description: "ชื่องานหรือรหัสออเดอร์",
        value: "name",
        require: true,
      },

      description: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "รายละเอียด",
        description: "รายละเอียดเพิ่มเติมของงาน",
        value: "description",
        require: false,
      },

      capacity: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "น้ำหนักสินค้า",
        description: "ตัวเลขมากกว่า 0",
        value: "capacity",
        require: true,
        regex: /^[1-9]\d*$/,
      },

      skills: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "ความสามารถเฉพาะ",
        description: 'ระบุได้เพียง 1 tag เช่น "ของเย็น"',
        value: "skills",
        require: false,
        regex: /^[ก-๙a-zA-Z0-9\s]+$/,
      },

      timeWindowStart: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "เวลาเปิดร้าน",
        description: "รูปแบบ HH:MM หรือ HH.MM",
        value: "timeWindowStart",
        require: true,
        regex: /^([01]\d|2[0-3])[:.]([0-5]\d)$/,
      },

      timeWindowEnd: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "เวลาปิดร้าน",
        description: "รูปแบบ HH:MM หรือ HH.MM",
        value: "timeWindowEnd",
        require: true,
        regex: /^([01]\d|2[0-3])[:.]([0-5]\d)$/,
      },

      location: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "ตำแหน่งจัดส่ง",
        description: "รูปแบบ latitude,longitude",
        value: "location",
        require: true,
        regex:
          /^-?(90(?:\.0{1,6})?|[0-8]?\d(?:\.\d{1,6})?),-?(180(?:\.0{1,6})?|1[0-7]\d(?:\.\d{1,6})?|\d{1,2}(?:\.\d{1,6})?)$/,
      },

      serviceTime: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "เวลาให้บริการ",
        description: "หน่วยเป็นนาที เช่น 15",
        value: "serviceTime",
        require: true,
        regex: /^(?:0|[1-9]\d*)$/,
      },

      type: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "ประเภทงาน",
        description: "pickup หรือ delivery",
        value: "type",
        require: true,
        regex: /^(pickup|delivery)$/,
      },

      priority: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "ลำดับความสำคัญ",
        description:
          'กรอกได้เฉพาะ "สูงมาก", "สูง", "ปานกลาง", "ต่ำ"',
        value: "priority",
        require: false,

        regex: /^(สูงมาก|สูง|ปานกลาง|ต่ำ)$/,
      },
    });

  const handleChange = (
    id: number,
    field: keyof Order,
    value: string,
  ) => {
    setOrderData((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              [field]:
                field === "capacity" ||
                field === "serviceTime"
                  ? Number(value)
                  : value,
            }
          : o,
      ),
    );
  };

  const columns = [
    {
      label: "ชื่องาน",
      render: (o: Order) => (
        <TextInput
          value={o.name}
          onChange={(value) =>
            handleChange(o.id, "name", value)
          }
          color="var(--p-1000)"
          width="10rem"
          fontSize="0.875rem"
        />
      ),
    },

    {
      label: "รายละเอียด",
      render: (o: Order) => (
        <TextInput
          value={o.description || ""}
          onChange={(value) =>
            handleChange(o.id, "description", value)
          }
          color="var(--p-1000)"
          width="12rem"
          fontSize="0.875rem"
        />
      ),
    },

    {
      label: "น้ำหนักสินค้า",
      render: (o: Order) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <TextInput
            value={o.capacity.toString()}
            onChange={(value) =>
              handleChange(o.id, "capacity", value)
            }
            color="var(--p-1000)"
            width="3rem"
            fontSize="0.875rem"
          />
          <span>ตัน</span> 
{/*ไม่มั่นใจเรื่องหน่วย */}

        </div>
      ),
    },

    {
  label: "ความสามารถเฉพาะ",

  render: (o: Order) => (
    <SkillInput
      skills={[]}
      isMutiSelect={false}
      value={
        o.skills
          ? [
              {
                id: o.skills.id,
                title: o.skills.name,
                color: o.skills.color,
              },
            ]
          : []
      }
      onChange={(newSkills) => {
        setOrderData((prev) =>
          prev.map((item) =>
            item.id === o.id
              ? {
                  ...item,

                  skills: newSkills[0]
                    ? {
                        id: newSkills[0].id,

                        name: newSkills[0].title,

                        color: newSkills[0].color,
                      }
                    : undefined,
                }
              : item,
          ),
        );
      }}
    />
  ),
},

    {
      label: "เวลาเปิดร้าน",
      render: (o: Order) => (
        <TimeInput
          width="5rem"
          value={toTimeValue(o.timeWindow.start)}
          onBlur={(time) => {
            if (
              time.hours.length < 2 ||
              time.minutes.length < 2
            )
              return;

            setOrderData((prev) =>
              prev.map((item) =>
                item.id === o.id
                  ? {
                      ...item,
                      timeWindow: {
                        ...item.timeWindow,
                        start: toNumberTime(time),
                      },
                    }
                  : item,
              ),
            );
          }}
        />
      ),
    },

    {
      label: "เวลาปิดร้าน",
      render: (o: Order) => (
        <TimeInput
          width="5rem"
          value={toTimeValue(o.timeWindow.end)}
          onBlur={(time) => {
            if (
              time.hours.length < 2 ||
              time.minutes.length < 2
            )
              return;

            setOrderData((prev) =>
              prev.map((item) =>
                item.id === o.id
                  ? {
                      ...item,
                      timeWindow: {
                        ...item.timeWindow,
                        end: toNumberTime(time),
                      },
                    }
                  : item,
              ),
            );
          }}
        />
      ),
    },

    {
      label: "ตำแหน่งจัดส่ง",
      render: (o: Order) => (
        <LocationInput
          inputId={`location-${o.id}`}
          value={o.location}
          color="var(--p-1000)"
          fontSize="0.875rem"
          onChange={(location) => {
            setOrderData((prev) =>
              prev.map((item) =>
                item.id === o.id
                  ? {
                      ...item,
                      location,
                    }
                  : item,
              ),
            );
          }}
        />
      ),
    },

    {
      label: "เวลาให้บริการ",
      render: (o: Order) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <TextInput
            value={o.serviceTime.toString()}
            onChange={(value) =>
              handleChange(
                o.id,
                "serviceTime",
                value,
              )
            }
            color="var(--p-1000)"
            width="3rem"
            fontSize="0.875rem"
          />

          <span>นาที</span>
        </div>
      ),
    },

    {
  label: "ประเภทงาน",
  render: (o: Order) => (
    <div style={{ overflow: "visible" }}>
      <SelectInput
        value={o.type}
        options={[
          {
            label: "Pick up",
            value: "pickup",
          },
          {
            label: "Delivery",
            value: "delivery",
          },
        ]}
        onChange={(value) => {
          setOrderData((prev) =>
            prev.map((item) =>
              item.id === o.id
                ? {
                    ...item,
                    type: value as Order["type"],
                  }
                : item,
            ),
          );
        }}
      />
    </div>
  ),
},

    {
  label: "ลำดับความสำคัญ",
  render: (o: Order) => (
    <SelectInput
      value={o.priority}
      options={[
        {
          label: "สูงมาก",
          value: "critical",
        },
        {
          label: "สูง",
          value: "high",
        },
        {
          label: "ปานกลาง",
          value: "medium",
        },
        {
          label: "ต่ำ",
          value: "low",
        },
      ]}
      onChange={(value) => {
        setOrderData((prev) =>
          prev.map((item) =>
            item.id === o.id
              ? {
                  ...item,
                  priority:
                    value as Order["priority"],
                }
              : item,
          ),
        );
      }}
    />
  ),
},
  ];

  const tableRef = useRef<HTMLTableElement>(null);

  const [colWidths, setColWidths] = useState<number[]>(
    [],
  );

  const [hoveredCol, setHoveredCol] =
    useState<number | null>(null);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (tableRef.current) {
      const ths =
        tableRef.current.querySelectorAll("thead th");

      const widths = Array.from(ths).map(
        (th) =>
          (th as HTMLElement).scrollWidth + 32,
      );

      setColWidths(widths);

      requestAnimationFrame(() => {
        setReady(true);
      });
    }
  }, []);

  const handleMouseDown = useCallback(
    (index: number) => (e: React.MouseEvent) => {
      e.preventDefault();

      const startX = e.clientX;

      const startLeftWidth = colWidths[index + 1];

      const startRightWidth = colWidths[index + 2];

      const onMouseMove = (e: MouseEvent) => {
        const diff = e.clientX - startX;

        const newLeft = Math.max(
          60,
          startLeftWidth + diff,
        );

        const newRight = Math.max(
          60,
          startRightWidth - diff,
        );

        setColWidths((prev) => {
          const next = [...prev];

          next[index + 1] = newLeft;

          next[index + 2] = newRight;

          return next;
        });
      };

      const onMouseUp = () => {
        document.removeEventListener(
          "mousemove",
          onMouseMove,
        );

        document.removeEventListener(
          "mouseup",
          onMouseUp,
        );
      };

      document.addEventListener(
        "mousemove",
        onMouseMove,
      );

      document.addEventListener(
        "mouseup",
        onMouseUp,
      );
    },
    [colWidths],
  );

  return (
    <>
      <Modal
        marginTop="5rem"
        onClose={() => setIsUpload(false)}
        isActive={isUpload}
      >
        <OrderUpload
          setOrderFileHeader={
            setOrderFileHeader
          }
          onClose={() => setIsUpload(false)}
          orderFileHeader={orderFileHeader}
        />
      </Modal>

      <button
        type="button"
        onClick={() => setIsUpload(true)}
      >
        Upload
      </button>

      <div className={styles.wrapper}>
        <table
          ref={tableRef}
          className={`${styles.table} ${
            ready
              ? styles.fixed
              : styles.auto
          }`}
        >
          <colgroup>
            {colWidths.map((w, i) => (
              <col
                key={i}
                style={{ width: w }}
              />
            ))}
          </colgroup>

          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.indexCol} />

              {columns.map((col, i) => (
                <th key={col.label}>
                  {col.label}

                  {i < columns.length - 1 && (
                    <span
                      className={`${
                        styles.resizer
                      } ${
                        hoveredCol === i + 1
                          ? styles.resizerVisible
                          : ""
                      }`}
                      onMouseDown={handleMouseDown(
                        i,
                      )}
                      onMouseEnter={() =>
                        setHoveredCol(i + 1)
                      }
                      onMouseLeave={() =>
                        setHoveredCol(null)
                      }
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className={styles.tableBody}>
            {orderData.map((o, row) => (
              <tr key={o.id}>
                <td className={styles.indexCol}>
                  {row + 1}
                </td>

                {columns.map((col, i) => (
                  <td key={col.label}>
                    {col.render(o)}

                    {i < columns.length - 1 && (
                      <span
                        className={`${
                          styles.resizer
                        } ${
                          hoveredCol === i + 1
                            ? styles.resizerVisible
                            : ""
                        }`}
                        onMouseDown={
                          handleMouseDown(i)
                        }
                        onMouseEnter={() =>
                          setHoveredCol(i + 1)
                        }
                        onMouseLeave={() =>
                          setHoveredCol(null)
                        }
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;