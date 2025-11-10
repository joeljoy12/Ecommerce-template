"use client"

import { Search } from "lucide-react"
import { DynamicIcon, iconNames } from "lucide-react/dynamic"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Button, Dropdown, Form, InputGroup } from "react-bootstrap"
import { PatchEvent, set, unset } from "sanity"

// ✅ Type for lucide icon names
export type IconName = (typeof iconNames)[number]

interface IconSelectorProps {
  value?: IconName | string
  onChange: (patchEvent: PatchEvent) => void
  placeholder?: string
  className?: string
  maxIcons?: number
}

export default function IconSelector({
  value,
  onChange,
  placeholder = "Search icons...",
  className = "",
  maxIcons = 60,
}: IconSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  // ✅ Filter icons based on search input
  const filteredIcons = useMemo(() => {
    const term = searchTerm.toLowerCase().trim()
    const icons = term
      ? iconNames.filter(
          (name) =>
            name.includes(term) ||
            name.replace(/-/g, " ").includes(term) ||
            name.replace(/-/g, "").includes(term)
        )
      : iconNames
    return icons.slice(0, maxIcons)
  }, [searchTerm, maxIcons])

  // ✅ Validate selected icon name
  const validValue =
    value && iconNames.includes(value as IconName)
      ? (value as IconName)
      : undefined

  const selectedIconDisplay = useMemo(() => {
    if (!validValue) return null
    return validValue.replace(/-/g, " ")
  }, [validValue])

  // ✅ Sanity-safe change handler
  const handleSelect = useCallback(
    (iconName: IconName) => {
      if (value === iconName) {
        onChange(PatchEvent.from(unset()))
      } else {
        onChange(PatchEvent.from(set(iconName)))
      }
      setIsOpen(false)
      setSearchTerm("")
    },
    [onChange, value]
  )

  // ✅ Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("touchstart", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
        document.removeEventListener("touchstart", handleClickOutside)
      }
    }
  }, [isOpen])

  // ✅ Responsive grid columns
  const columns =
    typeof window !== "undefined"
      ? window.innerWidth < 768
        ? 5
        : 8
      : 6

  return (
    <div
      className={`position-relative ${className}`}
      ref={dropdownRef}
      style={{
        zIndex: isOpen ? 1000 : "auto",
        marginBottom: isOpen ? "320px" : 0, // avoids overlap with next fields
      }}
    >
      {/* Dropdown Button */}
      <Dropdown show={isOpen} onToggle={() => setIsOpen(!isOpen)}>
        <Dropdown.Toggle
          variant="outline-secondary"
          className="w-100 d-flex align-items-center justify-content-between py-2 px-3"
          style={{ minHeight: "44px", fontSize: "15px" }}
        >
          <div className="d-flex align-items-center gap-2">
            {validValue ? (
              <>
                <DynamicIcon name={validValue} size={20} color="black"  />
                <span className="text-capitalize">{selectedIconDisplay}</span>
              </>
            ) : (
              <span className="text-muted">Select an icon</span>
            )}
          </div>
        </Dropdown.Toggle>

        {/* Dropdown Menu */}
        <Dropdown.Menu
          className="w-100 p-2 shadow"
          style={{
            minWidth: "320px",
            maxWidth: "500px",
            maxHeight: "340px",
            overflowY: "auto",
            borderRadius: "8px",
            background: "#000000ff",
            zIndex: 2000,
            position: "absolute",
          }}
        >
          {/* 🔍 Search Bar */}
          <div className="mb-2">
            <InputGroup size="sm">
              <InputGroup.Text className="border-0 bg-transparent">
                <Search size={16} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
                className="border-0 shadow-none"
                style={{ fontSize: "15px" }}
              />
            </InputGroup>
          </div>

          {/* 🧱 Icons Grid */}
          <div
            className="d-grid gap-1"
            style={{
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              paddingBottom: "8px",
            }}
          >
            {filteredIcons.length === 0 ? (
              <div
                className="text-center text-muted py-4"
                style={{ gridColumn: "1 / -1" }}
              >
                No icons found
              </div>
            ) : (
              filteredIcons.map((iconName) => (
                <Button
                  key={iconName}
                  variant={
                    validValue === iconName ? "primary" : "outline-secondary"
                  }
                  size="sm"
                  className="p-2 d-flex align-items-center justify-content-center"
                  onClick={() => handleSelect(iconName as IconName)}
                  title={iconName.replace(/-/g, " ")}
                  style={{
                    aspectRatio: "1",
                    minWidth: "36px",
                    borderRadius: "6px",
                  }}
                >
                  <DynamicIcon name={iconName as IconName} size={20} />
                </Button>
              ))
            )}
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}
