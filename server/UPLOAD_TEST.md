# Image Upload API Test

## Endpoint
`POST /user/upload`

## How to Test

### Using cURL:
```bash
curl -X POST http://localhost:5000/user/upload \
  -F "image=@/path/to/your/image.jpg"
```

### Using Postman:
1. Set method to **POST**
2. URL: `http://localhost:5000/user/upload`
3. Go to **Body** tab
4. Select **form-data**
5. Add a key named `image` and set type to **File**
6. Choose your image file
7. Click **Send**

### Using JavaScript (Fetch API):
```javascript
const formData = new FormData();
formData.append('image', fileInput.files[0]);

fetch('http://localhost:5000/user/upload', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

## Expected Response:
```json
{
  "msg": "Image uploaded successfully",
  "filePath": "/uploads/1234567890-123456789.jpg",
  "filename": "1234567890-123456789.jpg"
}
```

## File Constraints:
- **Allowed formats**: JPEG, JPG, PNG, GIF, WEBP
- **Max file size**: 5MB
- **Field name**: Must be `image`

## Access Uploaded Images:
After uploading, you can access the image at:
`http://localhost:5000/uploads/[filename]`
