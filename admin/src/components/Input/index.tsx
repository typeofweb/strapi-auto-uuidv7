// import { Field, FieldAction, FieldError, FieldHint, FieldInput, FieldLabel } from '@strapi/design-system/Field'
// import { Flex } from '@strapi/design-system/Flex'
// import { Stack } from '@strapi/design-system/Stack'
// import Refresh from '@strapi/icons/Refresh'
import React, { useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Refresh } from "@strapi/icons"
import { uuidv7 } from 'uuidv7'
import {
  Box,
  Field,
  FieldAction,
  FieldError,
  FieldHint,
  FieldInput,
  FieldLabel,
  Icon,
  Stack,
  Flex,
} from '@strapi/design-system';


export const FieldActionWrapper = styled(FieldAction)`
  svg {
    height: 1rem;
    width: 1rem;
    path {
      fill: ${({ theme }) => theme.colors.neutral400};
    }
  }

  svg:hover {
    path {
      fill: ${({ theme }) => theme.colors.primary600};
    }
  }
`

const Input = ({
  description,
  placeholder,
  disabled,
  error,
  intlLabel,
  labelAction,
  name,
  onChange,
  value: initialValue = "",
  ...props
}: {
  description: any
  placeholder: string
  disabled: boolean
  error: boolean
  intlLabel: any
  labelAction: string
  name: string
  onChange(v: any): void
  value: string
}) => {
  const { formatMessage } = useIntl()
  const [invalidUUID, setInvalidUUID] = useState<boolean>(false)
  const ref = useRef("")

  useEffect(() => {
    if(!initialValue) {
      const newUUID = uuidv7()
      onChange({ target: { value: newUUID, name }})
    }

    if(initialValue && initialValue !== ref.current)
      ref.current = initialValue

    // const validateValue = validate(initialValue)
    const validateValue = true;
    if(!validateValue) return setInvalidUUID(true)
    setInvalidUUID(false)
  }, [initialValue])

  return (
    <Box>
      <Field
        id={name}
        name={name}
        hint={description && formatMessage(description)}
        error={error ?? (
          invalidUUID
            ? formatMessage({
                id: 'uuidv7.form.field.error',
                defaultMessage: 'The UUIDv7 format is invalid.',
              })
            : null
          )
        }
      >
        <Stack spacing={1}>
          <Flex>
            <FieldLabel>{formatMessage(intlLabel)}</FieldLabel>
          </Flex>
          <FieldInput
            onChange={onChange}
            labelAction={labelAction}
            placeholder={placeholder}
            disabled={disabled}
            required
            value={initialValue}
            ref={ref}
            readOnly
            endAction={
              <FieldActionWrapper
                onClick={() => {
                  const newUUID = uuidv7()
                  onChange({ target: { value: newUUID, name }})
                }}
                label={formatMessage({
                  id: 'uuidv7.form.field.generate',
                  defaultMessage: 'Generate',
                })}
              >
                <Refresh />
              </FieldActionWrapper>
            }
          />
          <FieldHint />
          <FieldError />
        </Stack>
      </Field>
    </Box>
  )
}

export default Input
