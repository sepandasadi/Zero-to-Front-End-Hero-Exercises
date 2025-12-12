/**
 * Image Optimization Script
 *
 * This script uses Sharp to automatically generate optimized images in multiple formats and sizes.
 *
 * Installation:
 * npm install sharp
 *
 * Usage:
 * 1. Place your original images in ./original-images/
 * 2. Run: node optimize-images.js
 * 3. Optimized images will be in ./images/
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  inputDir: './original-images',
  outputDir: './images',
  sizes: [400, 800, 1200],
  formats: {
    jpeg: { quality: 80, progressive: true },
    webp: { quality: 85 },
    avif: { quality: 75 }
  }
};

// Create output directory if it doesn't exist
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
  console.log(`✓ Created ${config.outputDir} directory`);
}

/**
 * Optimize a single image to multiple formats and sizes
 */
async function optimizeImage(inputPath, outputBaseName) {
  console.log(`\n📸 Processing: ${path.basename(inputPath)}`);

  for (const size of config.sizes) {
    for (const [format, options] of Object.entries(config.formats)) {
      const extension = format === 'jpeg' ? 'jpg' : format;
      const outputPath = path.join(
        config.outputDir,
        `${outputBaseName}-${size}.${extension}`
      );

      try {
        const sharpInstance = sharp(inputPath).resize(size, null, {
          withoutEnlargement: true // Don't upscale if original is smaller
        });

        // Apply format-specific optimization
        switch (format) {
          case 'jpeg':
            await sharpInstance
              .jpeg(options)
              .toFile(outputPath);
            break;
          case 'webp':
            await sharpInstance
              .webp(options)
              .toFile(outputPath);
            break;
          case 'avif':
            await sharpInstance
              .avif(options)
              .toFile(outputPath);
            break;
        }

        // Log file size
        const stats = fs.statSync(outputPath);
        const sizeKB = (stats.size / 1024).toFixed(1);
        console.log(`  ✓ ${path.basename(outputPath)} - ${sizeKB} KB`);
      } catch (error) {
        console.error(`  ✗ Error creating ${outputPath}:`, error.message);
      }
    }
  }
}

/**
 * Process all images in the input directory
 */
async function processAllImages() {
  // Check if input directory exists
  if (!fs.existsSync(config.inputDir)) {
    console.error(`❌ Error: Directory "${config.inputDir}" not found!`);
    console.log('\n💡 Create the directory and add your images:');
    console.log(`   mkdir ${config.inputDir}`);
    console.log(`   # Then add your .jpg, .jpeg, or .png files\n`);
    return;
  }

  // Get all image files
  const files = fs.readdirSync(config.inputDir);
  const imageFiles = files.filter(f =>
    /\.(jpg|jpeg|png)$/i.test(f)
  );

  if (imageFiles.length === 0) {
    console.log(`⚠️  No images found in ${config.inputDir}`);
    console.log('   Add .jpg, .jpeg, or .png files and try again.\n');
    return;
  }

  console.log(`\n🚀 Found ${imageFiles.length} image(s) to optimize\n`);
  console.log(`Creating ${config.sizes.length} sizes × ${Object.keys(config.formats).length} formats = ${config.sizes.length * Object.keys(config.formats).length} files per image\n`);

  // Process each image
  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    const inputPath = path.join(config.inputDir, file);
    const outputBaseName = `photo${i + 1}`; // photo1, photo2, photo3, etc.

    await optimizeImage(inputPath, outputBaseName);
  }

  console.log('\n✅ All images optimized successfully!\n');
  console.log(`📁 Check the ${config.outputDir} directory for your optimized images.\n`);
}

// Run the script
processAllImages().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

