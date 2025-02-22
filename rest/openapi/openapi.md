# SampleのAPI仕様書

> Version 1.0

Nest.jsで作成したAPIの仕様書です。

## Path Table

| Method | Path | Description |
| --- | --- | --- |
| GET | [/](#get) |  |
| GET | [/api/v1/sample/get](#getapiv1sampleget) |  |
| POST | [/api/v1/sample/post](#postapiv1samplepost) |  |

## Reference Table

| Name | Path | Description |
| --- | --- | --- |
| GetSampleResponseDto | [#/components/schemas/GetSampleResponseDto](#componentsschemasgetsampleresponsedto) |  |
| PostSampleRequestBodyDto | [#/components/schemas/PostSampleRequestBodyDto](#componentsschemaspostsamplerequestbodydto) |  |
| PostSampleResponseDto | [#/components/schemas/PostSampleResponseDto](#componentsschemaspostsampleresponsedto) |  |

## Path Details

***

### [GET]/

#### Responses

- 200 

***

### [GET]/api/v1/sample/get

- Description  
GETメソッドのサンプルAPI

#### Responses

- 200 APIが正常終了

`application/json`

```ts
{
  id: number
  text: string
}
```

***

### [POST]/api/v1/sample/post

- Description  
POSTメソッドのサンプルAPI

#### RequestBody

- application/json

```ts
{
  text: string
}
```

#### Responses

- 200 APIが正常終了

`application/json`

```ts
{
  upperText: string
  lowerText: string
  textLength: number
}
```

- 500 Internal Server Error

## References

### #/components/schemas/GetSampleResponseDto

```ts
{
  id: number
  text: string
}
```

### #/components/schemas/PostSampleRequestBodyDto

```ts
{
  text: string
}
```

### #/components/schemas/PostSampleResponseDto

```ts
{
  upperText: string
  lowerText: string
  textLength: number
}
```
